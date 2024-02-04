import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppConfig } from '@/core/config/app-config';
import { UserAlreadyExistsException, UserNotFoundException } from '@/core/exceptions';
import { CustomersService } from '@/modules/customers/customers.service';
import { User } from '@/modules/users/models/user.model';
import { UsersService } from '@/modules/users/users.service';

import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { Auth } from './models/auth.model';
import { Tokens } from './models/tokens.model';
import { PasswordService } from './password.service';
import { Roles } from './types';

// function getErrorMessage(error: unknown) {
//   if (error instanceof Error) return error.message;
//   return String(error);
// }

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly appConfig: AppConfig,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) {}

  async register(registerUserInput: RegisterUserInput): Promise<Auth> {
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
    // TODO. Check if the customer already exists and not connected with any user
    const customer = await this.customersService.findByPhoneNumberOrCreate(createCustomerInput);

    // 4. Send an email to confirm the user
    // TODO Add bullmq service to send email

    // 5. Create the user
    const user = await this.usersService.create({
      ...createUserInput,
      passwordHash,
      active: false,
      confirmed: false,
      role: Roles.USER,
      customerId: customer.id,
    });

    if (!user) {
      throw new InternalServerErrorException('Failed to create user');
    }

    // 6. Generate tokens
    // TODO return this.generateTokens(user, agent);
    const tokens = await this.generateTokens({ userId: user?.id });

    return {
      user,
      ...tokens,
    };
  }

  async login(loginUserInput: LoginUserInput): Promise<Auth> {
    this.logger.debug(`Operation: loginUser`);
    // TODO add agent: string

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

    const tokens = await this.generateTokens({ userId: user.id });

    return {
      user,
      ...tokens,
    };
  }

  refreshTokens(userId: string): Promise<Tokens> {
    // const token = await this.prismaService.token.delete({ where: { token: refreshToken } });
    this.logger.debug(`Operation: refreshTokens`);

    // if (!token) {
    //   throw new UnauthorizedException('The refresh token is invalid');
    // }

    // if (new Date(token.expires) < new Date()) {
    //   throw new UnauthorizedException('The refresh token is expired');
    // }

    return this.generateTokens({ userId });
  }

  getCurrentUser(userId: string): Promise<User | null> {
    this.logger.debug(`Operation: getCurrentUser`);

    return this.usersService.findOne(userId);
  }

  private async generateTokens(payload: { userId: string }): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken({ sub: payload.userId }),
      this.generateRefreshToken({ sub: payload.userId }),
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
