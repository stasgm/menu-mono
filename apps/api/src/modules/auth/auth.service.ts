import { ConflictException, HttpStatus, Injectable, Logger } from '@nestjs/common';

// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { UsersService } from '@/modules/users/users.service';

import { CreateCustomerInput, CreateUserInput, User } from '../../types/graphql.schema';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    // private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService // private readonly configService: ConfigService,
  ) // private readonly prismaService: PrismaService
  {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { name, password } = registerDto;

    const existedUser = await this.usersService.findByName(name);

    if (existedUser) {
      throw new ConflictException('The user with this email already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    const createCustomerInput: CreateCustomerInput = {
      email: 'test@mail.com',
      firstName: 'Stas',
      lastName: 'ThatGuy',
      phoneNumber: '5555555',
    };

    const createUserInput: CreateUserInput = {
      name,
      password: hashedPassword,
    };

    // Separate User and Person
    return this.usersService.create(createCustomerInput, createUserInput);
  }

  // async login(email: string, password: string): Promise<MutationResponse> {
  //   const userEntity = await this.usersService.findForAuth(email);

  //   if (!userEntity) {
  //     return {
  //       status: HttpStatus.UNAUTHORIZED,
  //       errors: invalidLogin,
  //     };
  //   }

  //   const { id, confirmed } = userEntity;

  //   if (!confirmed) {
  //     return {
  //       status: HttpStatus.UNAUTHORIZED,
  //       errors: emailNotConfirmed,
  //     };
  //   }

  //   if (!(await this.comparePasswords(password, userEntity.password))) {
  //     return {
  //       status: HttpStatus.UNAUTHORIZED,
  //       errors: invalidLogin,
  //     };
  //   }

  //   const refresh_token = await this.getUserRefreshToken(id);

  //   const tokens = {
  //     access_token: await this.generateAccessToken(id),
  //     refresh_token: refresh_token || (await this.generateRefreshToken(id)),
  //   };

  //   await AuthService.redisInstance.set(
  //     id,
  //     tokens.refresh_token,
  //     'ex',
  //     this.configurationService.get(Configuration.JWT_REFRESH_AGE_S)
  //   );

  //   return {
  //     status: HttpStatus.OK,
  //     errors: [],
  //     payload: JSON.stringify(tokens),
  //   };
  // }
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

  // async register(dto: CreateUserDto) {
  //   const existedUser = await this.usersService.findByEmail(dto.email).catch((error) => {
  //     this.logger.error(error);
  //     return null;
  //   });
  //   if (existedUser) {
  //     throw new ConflictException('The user with this email already exists');
  //   }
  //   const hashedPassword = await this.passwordService.hashPassword(dto.password);
  //   const user = await this.usersService.create({
  //     ...dto,
  //     password: hashedPassword,
  //   });
  //   await this.usersService.addAccountToUser(user.id, Provider.Credentials, user.id);
  //   return user;
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

  // private async generateTokens(user: User, agent: string): Promise<Tokens> {
  //   const accessToken = this.jwtService.sign({
  //     id: user.id,
  //     email: user.email,
  //     fullName: user.fullName,
  //   });
  //   const refreshToken = await this.getRefreshToken(user.id, agent);
  //   return { accessToken, refreshToken };
  // }

  // private async getRefreshToken(userId: string, agent: string): Promise<Token> {
  //   const _token = await this.prismaService.token.findFirst({
  //     where: {
  //       userId,
  //       userAgent: agent,
  //     },
  //   });
  //   const token = _token?.token ?? '';
  //   const refreshExpiresIn = this.configService.get<AppConfiguration>('app').jwt.refreshExpiresIn;
  //   return this.prismaService.token.upsert({
  //     where: { token },
  //     update: {
  //       token: v4(),
  //       expires: add(new Date(), { days: Number(refreshExpiresIn) }),
  //     },
  //     create: {
  //       token: v4(),
  //       expires: add(new Date(), { days: Number(refreshExpiresIn) }),
  //       userId,
  //       userAgent: agent,
  //     },
  //   });
  // }

  // deleteRefreshToken(token: string) {
  //   return this.prismaService.token.delete({ where: { token } });
  // }

  // async providerAuth(props: {
  //   fullName: string;
  //   email: string;
  //   originalProviderId: string;
  //   provider: Provider;
  // }): Promise<User> {
  //   const { fullName, email, provider, originalProviderId } = props;
  //   let user = await this.usersService.findByEmail(email);
  //   if (!user) {
  //     user = await this.usersService.create({
  //       email,
  //       fullName,
  //     });
  //   }
  //   await this.usersService.addAccountToUser(user.id, provider, originalProviderId);
  //   return user;
  // }

  // async providerTokens(email: string, agent: string): Promise<Tokens> {
  //   const user = await this.usersService.findByEmail(email);
  //   return this.generateTokens(user, agent);
  // }
}
