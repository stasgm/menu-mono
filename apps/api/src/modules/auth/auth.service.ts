import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppConfig } from '@/core/config/app-config';
import { UserAlreadyExistsException, UserNotConfirmedException, UserNotFoundException } from '@/core/exceptions';
import { ActivationCodesService } from '@/modules/activation-codes/activation-codes.service';
import { ActivationCode } from '@/modules/activation-codes/models/activation-code.model';
import { CustomersService } from '@/modules/customers/customers.service';
import { MailService } from '@/modules/mail/mail.service';
import { User } from '@/modules/users/models/user.model';
import { UsersService } from '@/modules/users/users.service';

import { IContextData } from './decorators/context-data.decorator';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { RegisterUserInput } from './dto/inputs/register-user.input';
import { Auth } from './models/auth.model';
import { Tokens } from './models/tokens.model';
import { PasswordService } from './password.service';
import { JwtPayload, Roles } from './types';

// function getErrorMessage(error: unknown) {
//   if (error instanceof Error) return error.message;
//   return String(error);
// }

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly appConfig: AppConfig,
    private readonly activationCodesService: ActivationCodesService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) {}

  async register(registerUserInput: RegisterUserInput, ctx: IContextData): Promise<User> {
    this.logger.debug(`Operation: registerUser`);

    const { password, customer: createCustomerInput, ...createUserInput } = registerUserInput;
    // TODO validate name (minimal required length) and password strength

    // 1. Check if the user already exists
    const existedUser = await this.usersService.findByName(createUserInput.name);

    if (existedUser) {
      throw new UserAlreadyExistsException();
    }

    // 2. Hash the password
    const passwordHash = await this.passwordService.hashPassword(password);

    // DEFAULT VALUES:
    // - active: false
    // - rule: USER
    // - confirmed: false

    // 3. Create the customer
    // TODO Check if the customer already exists and not connected with any user
    const customer = await this.customersService.findByPhoneNumberOrCreate(createCustomerInput);

    // 4. Create the user
    // TODO customer and user should work on the same transaction
    const user = await this.usersService.create({
      ...createUserInput,
      passwordHash,
      active: true,
      confirmed: false,
      role: Roles.USER,
      customerId: customer.id,
    });

    if (!user) {
      throw new InternalServerErrorException('Failed to create user');
    }

    // 5. Send an email to activate the user.
    const activationCode = await this.activationCodesService.create({
      userId: user.id,
    });

    // TODO use the same transaction as user and customer
    if (!activationCode) {
      throw new InternalServerErrorException('Failed to create activation code');
    }

    const originIp = ctx.originIp ?? 'Unknown';
    const device = ctx.userAgent ?? 'Unknown';
    const location = 'Unknown';

    await this.mailService.userRegister({
      to: customer.email,
      data: {
        userName: user.name,
        code: activationCode.code,
        location,
        originIp,
        device,
      },
    });

    // 6. Return the activation code
    return user;

    // // 6. Generate tokens
    // // TODO generate tokens for the user and agent: this.generateTokens(user, agent);
    // // TODO do not generate tokens if the user is not active
    // const tokens = await this.generateTokens({ sub: user.id, role: user.role });

    // return {
    //   user,
    //   ...tokens,
    // };
  }

  async login(loginUserInput: LoginUserInput): Promise<Auth> {
    this.logger.debug(`Operation: loginUser`);
    // TODO add agent for the token
    // TODO restrict if the user is not confirmed or disabed

    const { name, password } = loginUserInput;

    const user = await this.usersService.findForAuth(name);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!user.active) {
      throw new UnauthorizedException();
    }

    if (!(await this.passwordService.validatePassword(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    if (!user.confirmed) {
      throw new UserNotConfirmedException();
    }

    const payload = { sub: user.id, role: user.role };

    const tokens = await this.generateTokens(payload);

    return {
      user,
      ...tokens,
    };
  }

  refreshTokens(payload: JwtPayload): Promise<Tokens> {
    this.logger.debug(`Operation: refreshTokens`);
    // const token = await this.prismaService.token.delete({ where: { token: refreshToken } });

    // if (!token) {
    //   throw new UnauthorizedException('The refresh token is invalid');
    // }

    return this.generateTokens(payload);
  }

  getCurrentUser(id: string): Promise<User | null> {
    this.logger.debug(`Operation: getCurrentUser`);

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

  private generateAccessToken(payload: { sub: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.appConfig.jwt.accessExpiresIn,
      secret: this.appConfig.jwt.accessSecret,
    });
  }

  private generateRefreshToken(payload: { sub: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.appConfig.jwt.refreshExpiresIn,
      secret: this.appConfig.jwt.refreshSecret,
    });
  }
}
