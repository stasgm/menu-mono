import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppConfig } from '@/core/config/app-config';
import { UserAlreadyExistsException, UserNotFoundException } from '@/core/exceptions';
import { CustomersService } from '@/modules/customers/customers.service';
import { UsersService } from '@/modules/users/users.service';

import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { PasswordService } from './password.service';
import { IResponse, Roles, Tokens } from './types';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

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

  async register(registerUserInput: RegisterUserInput): Promise<IResponse> {
    const { password, customer: createCustomerInput, ...createUserInput } = registerUserInput;
    // TODO validate name minimal required length and password strength

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
    const customer = await this.customersService.findByPhoneNumberOrCreate(createCustomerInput);

    // 4. Send an email to confirm the user
    // TODO Add bullmq service to send email

    // 5. Create the user
    try {
      await this.usersService.create({
        ...createUserInput,
        passwordHash,
        active: false,
        confirmed: false,
        role: Roles.USER,
        customerId: customer.id,
      });

      return {
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      // TODO parse err type. Detect type of error and return the correct status

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: [getErrorMessage(error)],
      };
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<IResponse> {
    const { name, password } = loginUserInput;

    const user = await this.usersService.findForAuth(name);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!user.active) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        errors: ['emailNotConfirmed'],
      };
    }

    if (!(await this.passwordService.validatePassword(password, user.passwordHash))) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        errors: ['invalidLogin'],
      };
    }

    const tokens = await this.generateTokens({ userId: user.id });

    return {
      status: HttpStatus.OK,
      payload: tokens,
    };
  }

  async generateTokens(payload: { userId: string }): Promise<Tokens> {
    return {
      access_token: await this.generateAccessToken({ sub: payload.userId }),
      refresh_token: await this.generateRefreshToken({ sub: payload.userId }),
    };
  }

  generateAccessToken(payload: { sub: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.appConfig.jwt.accessExpiresIn,
      secret: this.appConfig.jwt.accessSecret,
    });
  }

  generateRefreshToken(payload: { sub: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.appConfig.jwt.refreshExpiresIn,
      secret: this.appConfig.jwt.refreshSecret,
    });
  }

  async refreshTokens(userId: string): Promise<IResponse> {
    // const token = await this.prismaService.token.delete({ where: { token: refreshToken } });

    // if (!token) {
    //   throw new UnauthorizedException('The refresh token is invalid');
    // }

    // if (new Date(token.expires) < new Date()) {
    //   throw new UnauthorizedException('The refresh token is expired');
    // }

    // return {
    //   status: HttpStatus.OK,
    //   payload: JSON.stringify(await this.generateTokens({ userId })),
    // }

    const tokens = await this.generateTokens({ userId });

    return {
      status: HttpStatus.OK,
      payload: tokens,
    };
  }

  // async login(email: string, password: string, agent: string) {
  //   const user = await this.usersService.findByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException('Login or password is incorrect');
  //   }
  //   const passwordValid = await this.passwordService.comparePassword(user.password, password);
  //   if (!passwordValid) {
  //     throw new UnauthorizedException('Login or password is incorrect');
  //   }
  //   return this.generateTokens(user, agent);
  // }
}
