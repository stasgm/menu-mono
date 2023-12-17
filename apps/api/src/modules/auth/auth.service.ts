import { ConflictException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppConfig } from '@/core/config/app-config';
import { UsersService } from '@/modules/users/users.service';

import { CreateCustomerInput, CreateUserInput } from '../../types/graphql.schema';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './password.service';
import { IResponse, Tokens } from './types';

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
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) {}

  async register(registerDto: RegisterDto): Promise<IResponse> {
    const { name, password } = registerDto;
    // TODO validate credentials with ZOD

    const existedUser = await this.usersService.findByName(name);

    if (existedUser) {
      throw new ConflictException('The user with this name already exists');
    }

    const createCustomerInput: CreateCustomerInput = {
      email: 'test@mail.com',
      firstName: 'Stas',
      lastName: 'ThatGuy',
      phoneNumber: '5555555',
    };

    const createUserInput: CreateUserInput = {
      name,
      password,
    };

    // Send an email to confirm the user

    try {
      await this.usersService.create(createUserInput, createCustomerInput);
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

  async login(name: string, password: string): Promise<IResponse> {
    const user = await this.usersService.findForAuth(name);

    if (!user) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        errors: ['InvalidLogin'],
      };
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

    return {
      status: HttpStatus.OK,
      payload: JSON.stringify(await this.generateTokens({ userId: user.id })),
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
    return {
      status: HttpStatus.OK,
      payload: JSON.stringify(await this.generateTokens({ userId })),
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
