import { ConflictException, Injectable, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

// import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { UsersService } from '@/modules/users/users.service';

import { CreateCustomerInput, CreateUserInput, User } from '../../types/graphql.schema';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './password.service';
import { AppConfig } from '../../core/config/app-config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly appConfig: AppConfig,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { name, password } = registerDto;

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

    // Return status (the result of registratiion) instead of a user
    return this.usersService.create(createUserInput, createCustomerInput);
  }

  async login(name: string, password: string): Promise<User> {
    const userEntity = await this.usersService.findForAuth(name);

    if (!userEntity) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        errors: invalidLogin,
      };
    }

    const { id, confirmed } = userEntity;

    if (!confirmed) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        errors: emailNotConfirmed,
      };
    }

    if (!(await this.comparePasswords(password, userEntity.password))) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        errors: invalidLogin,
      };
    }

    const refresh_token = await this.getUserRefreshToken(id);

    const tokens = {
      access_token: await this.generateAccessToken(id),
      refresh_token: refresh_token || (await this.generateRefreshToken(id)),
    };

    await AuthService.redisInstance.set(
      id,
      tokens.refresh_token,
      'ex',
      this.configurationService.get(Configuration.JWT_REFRESH_AGE_S)
    );

    return {
      status: HttpStatus.OK,
      errors: [],
      payload: JSON.stringify(tokens),
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
  // async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
  //   const token = await this.prismaService.token.delete({ where: { token: refreshToken } });
  //   if (!token) {
  //     throw new UnauthorizedException('The refresh token is invalid');
  //   }
  //   if (new Date(token.expires) < new Date()) {
  //     throw new UnauthorizedException('The refresh token is expired');
  //   }
  //   const user = await this.usersService.findById(token.userId);
  //   return this.generateTokens(user, agent);
  // }

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
