import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppConfig } from '@/core/config/app-config';
import {
  InvalidActivationCodeAttemptsExceededException,
  InvalidCredentialsException,
  UserAlreadyActivatedException,
  UserAlreadyExistsException,
  UserDisabledException,
  UserNotFoundException,
} from '@/core/exceptions';
import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';
import { MailJob } from '@/core/schedulers/bullmq/producer/bullmq-producer.types';
import { ActivationCodesService } from '@/modules/auth/activation-codes/activation-codes.service';
import { CustomersService } from '@/modules/customers/customers.service';
import { User } from '@/modules/users/models/user.model';
import { UsersService } from '@/modules/users/users.service';

import { IUserForgotPasswordData, IUserPasswordResetData } from '../mail/mail.types';
import {
  ActivateUserInput,
  ForgotPasswordInput,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
} from './dto/inputs';
import { ActivationToken, Auth, SuccessfulResponse, Tokens } from './dto/results';
import { PasswordService } from './password.service';
import { IContextData, JwtPayload, Roles, TokenType } from './types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly appConfig: AppConfig,
    private readonly activationCodesService: ActivationCodesService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
    private readonly bullmqProducerService: BullmqProducerService,
    private readonly passwordService: PasswordService
  ) {}

  async register(registerUserInput: RegisterUserInput, ctx: IContextData): Promise<ActivationToken> {
    this.logger.debug('Operation: registerUser');

    const { password, customer: createCustomerInput, ...createUserInput } = registerUserInput;
    // TODO validate name (minimal required length) and password strength

    // 1. Check if the user already exists
    const existedUser = await this.usersService.findByName(createUserInput.name);

    if (existedUser) {
      throw new UserAlreadyExistsException();
    }

    // 2. Create the customer
    // TODO Check if the customer already exists and not connected with any user
    const customer = await this.customersService.findByPhoneNumberOrCreate(createCustomerInput);

    // 3. Hash the password
    const passwordHash = await this.passwordService.hashPassword(password);

    // 4. Create the user
    //   DEFAULT VALUES:
    //   - active: false
    //   - rule: USER
    // TODO customer and user should work on the same transaction. pass a transaction as argument
    const user = await this.usersService.create({
      ...createUserInput,
      passwordHash,
      active: false,
      disabled: false,
      role: Roles.USER,
      customerId: customer.id,
    });

    // 5. Generate an activation code and send it to the user email
    await this.activationCodesService.createOrRefreshCodeAndSendEmail({
      create: true,
      userId: user.id,
      info: {
        originIp: ctx.originIp ?? 'Unknown',
        device: ctx.userAgent ?? 'Unknown',
        location: 'Unknown',
      },
    });

    // 6. Generate Activation token
    const payload = { sub: user.id, role: user.role };
    const activationToken = await this.generateToken(payload, 'activate');

    return {
      activationToken,
    };
  }

  async activate(activateUserInput: ActivateUserInput, userId: string, ctx: IContextData): Promise<SuccessfulResponse> {
    this.logger.debug('Operation: activateUser');

    const { activationCode } = activateUserInput;
    // 1. Check the user
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.active) {
      throw new UserAlreadyActivatedException();
    }

    // 2. Activate the user
    const activationCodeEntity = await this.activationCodesService.verifyByUserId(user.id, activationCode);

    if (!activationCodeEntity) {
      // Max number of attempts has exceeded for this code -> regenerate and send a new code
      await this.activationCodesService.createOrRefreshCodeAndSendEmail({
        userId: user.id,
        info: {
          originIp: ctx.originIp ?? 'Unknown',
          device: ctx.userAgent ?? 'Unknown',
          location: 'Unknown',
        },
      });

      throw new InvalidActivationCodeAttemptsExceededException();
    }

    // // 3. Activate the user
    await this.usersService.activate(user.id);
    // const payload = { sub: user.id, role: user.role };
    // const tokens = await this.generateTokens(payload);

    return {
      message: 'User activated',
    };
  }

  async refreshActivationCode(userId: string, ctx: IContextData): Promise<ActivationToken> {
    this.logger.debug('Operation: refreshActivationCode');

    // 1. Check the user
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.active) {
      throw new UserAlreadyActivatedException();
    }

    // 2. Generate an activation code and send it to the user email
    await this.activationCodesService.createOrRefreshCodeAndSendEmail({
      userId: user.id,
      info: {
        originIp: ctx.originIp ?? 'Unknown',
        device: ctx.userAgent ?? 'Unknown',
        location: 'Unknown',
      },
    });

    // 3. Generate new activation token
    const payload = { sub: user.id, role: user.role };
    const activationToken = await this.generateToken(payload, 'activate');

    return {
      activationToken,
    };
  }

  async login(loginUserInput: LoginUserInput): Promise<Auth | ActivationToken> {
    this.logger.debug('Operation: loginUser');
    // TODO add agent for the token

    const { name, password } = loginUserInput;

    // Include disabled but exclude deleted users
    const userForAuth = await this.usersService.findForAuth(name);

    if (!userForAuth) {
      throw new InvalidCredentialsException();
    }

    if (userForAuth.disabled) {
      throw new UserDisabledException();
    }

    const { passwordHash, ...user } = userForAuth;

    const isPasswordValid = await this.passwordService.validatePassword(password, passwordHash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const payload = { sub: user.id, role: user.role };

    if (!user.active) {
      const activationToken = await this.generateToken(payload, 'activate');

      return {
        activationToken,
      };
    }

    const tokens = await this.generateTokens(payload);

    return {
      user,
      ...tokens,
    };
  }

  refreshTokens(payload: JwtPayload): Promise<Tokens> {
    this.logger.debug('Operation: refreshTokens');

    return this.generateTokens(payload);
  }

  async getCurrentUser(id: string): Promise<User> {
    this.logger.debug('Operation: getCurrentUser');

    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async forgotEmail(data: ForgotPasswordInput, ctx: IContextData): Promise<SuccessfulResponse> {
    this.logger.debug('Operation: forgotEmail');

    // 1. Check email
    const user = await this.usersService.findByEmail(data.email);

    if (user) {
      const info = {
        originIp: ctx.originIp ?? 'Unknown',
        device: ctx.userAgent ?? 'Unknown',
        location: 'Unknown',
      };

      // Remove role from the payload and relace sub with email
      const token = await this.generateToken({ sub: user.id, role: user.role }, 'resetPass');

      const resetLink = `${this.appConfig.frontendUrl}/reset-password?token=${token}`;

      // 2. Send the email with the activation code
      await this.bullmqProducerService.insertNewJob<MailJob<IUserForgotPasswordData>>({
        name: 'mailJob',
        data: {
          to: {
            name: user.name,
            address: user.customer.email,
          },
          type: 'resetPasswordRequest',
          context: {
            resetLink,
            userName: user.name,
            location: info.location,
            originIp: info.originIp,
            device: info.device,
          },
        },
      });

      return {
        message: this.appConfig.envPrefix === 'test' ? token : 'Email sent',
      };
    } else {
      // throw new UserNotFoundException();
      // Don't throw an error, just return the success response
    }

    return {
      message: 'Email sent',
    };
  }

  async resetPassword(data: ResetPasswordInput, ctx: IContextData): Promise<SuccessfulResponse> {
    this.logger.debug('Operation: resetPassword');

    // 1. Find user by email
    const user = await this.usersService.findByEmail(data.email);

    // The user is already checked by userId in jwt-reset-pass.strategy
    if (!user) {
      throw new UserNotFoundException();
    }

    const info = {
      originIp: ctx.originIp ?? 'Unknown',
      device: ctx.userAgent ?? 'Unknown',
      location: 'Unknown',
    };

    // 2. Hash the password
    const passwordHash = await this.passwordService.hashPassword(data.password);

    // 3. Update the user passwordHash
    await this.usersService.updatePasswordHash(user.id, passwordHash);

    //4. Send the email with the activation code
    await this.bullmqProducerService.insertNewJob<MailJob<IUserPasswordResetData>>({
      name: 'mailJob',
      data: {
        to: {
          name: user.name,
          address: user.customer.email,
        },
        type: 'resetPasswordConfirmation',
        context: {
          userName: user.name,
          location: info.location,
          originIp: info.originIp,
          device: info.device,
        },
      },
    });

    return {
      message: 'Password changed',
    };
  }

  private async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(payload, 'access'),
      this.generateToken(payload, 'refresh'),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateToken(payload: JwtPayload, tokenType: TokenType): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.appConfig.jwt[tokenType].expiresIn,
      secret: this.appConfig.jwt[tokenType].secret,
    });
  }

  // private generateAccessToken(payload: JwtPayload): Promise<string> {
  //   return this.jwtService.signAsync(payload, {
  //     expiresIn: this.appConfig.jwt.accessExpiresIn,
  //     secret: this.appConfig.jwt.accessSecret,
  //   });
  // }

  // private generateRefreshToken(payload: JwtPayload): Promise<string> {
  //   return this.jwtService.signAsync(payload, {
  //     expiresIn: this.appConfig.jwt.refreshExpiresIn,
  //     secret: this.appConfig.jwt.refreshSecret,
  //   });
  // }

  // private generateActivationToken(payload: JwtPayload): Promise<string> {
  //   return this.jwtService.signAsync(payload, {
  //     expiresIn: this.appConfig.jwt.activateExpiresIn,
  //     secret: this.appConfig.jwt.activateSecret,
  //   });
  // }
}
