import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppConfig } from '@/core/config/app-config';
import {
  InvalidActivationCodeAttemptsExceededException,
  InvalidCredentialsException,
  UserAlreadyExistsException,
  UserDisabledException,
  UserNotFoundException,
} from '@/core/exceptions';
import { ActivationCodesService } from '@/modules/activation-codes/activation-codes.service';
import { CustomersService } from '@/modules/customers/customers.service';
import { User } from '@/modules/users/models/user.model';
import { UsersService } from '@/modules/users/users.service';

import { IContextData } from './decorators/context-data.decorator';
import { ActivateUserInput, LoginUserInput, RegisterUserInput } from './dto/inputs';
import { ActivationToken, Auth, Tokens } from './models/';
import { PasswordService } from './password.service';
import { JwtPayload, Roles } from './types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly appConfig: AppConfig,
    private readonly activationCodesService: ActivationCodesService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
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
      active: true,
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
    const activationToken = await this.generateActivationToken(payload);

    return {
      activationToken,
    };
  }

  async activate(activateUserInput: ActivateUserInput, userId: string, ctx: IContextData): Promise<Auth> {
    this.logger.debug('Operation: activateUser');

    const { activationCode } = activateUserInput;
    // 1. Check the user
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.active) {
      throw new UserAlreadyExistsException();
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

    // 3. Get the activated user
    const activatedUser = await this.usersService.activate(user.id);
    const payload = { sub: user.id, role: user.role };
    const tokens = await this.generateTokens(payload);

    return {
      user: activatedUser,
      ...tokens,
    };
  }

  async login(loginUserInput: LoginUserInput): Promise<Auth | ActivationToken> {
    this.logger.debug('Operation: loginUser');
    // TODO add agent for the token

    const { name, password } = loginUserInput;

    const userWithPasswordHash = await this.usersService.findForAuth(name);

    if (!userWithPasswordHash) {
      throw new InvalidCredentialsException();
    }

    if (userWithPasswordHash.disabled) {
      throw new UserDisabledException();
    }

    const { passwordHash, ...user } = userWithPasswordHash;

    const isPasswordValid = await this.passwordService.validatePassword(password, passwordHash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const payload = { sub: user.id, role: user.role };

    if (!user.active) {
      const activationToken = await this.generateActivationToken(payload);

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

  getCurrentUser(id: string): Promise<User | null> {
    this.logger.debug('Operation: getCurrentUser');

    return this.usersService.findOne(id);
  }

  private async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.appConfig.jwt.accessExpiresIn,
      secret: this.appConfig.jwt.accessSecret,
    });
  }

  private generateRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.appConfig.jwt.refreshExpiresIn,
      secret: this.appConfig.jwt.refreshSecret,
    });
  }

  private generateActivationToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.appConfig.jwt.activateExpiresIn,
      secret: this.appConfig.jwt.activateSecret,
    });
  }
}
