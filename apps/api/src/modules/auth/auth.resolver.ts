// import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../../types/graphql.schema';
import { AuthService } from './auth.service';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('register')
  register(@Args('name') name: string, @Args('password') password: string): Promise<User> {
    return this.authService.register({ name, password });
  }

  @Mutation('login')
  login(@Args('name') name: string, @Args('password') password: string): Promise<User> {
    return this.authService.login(name, password);
  }

  // @Mutation('confirm')
  // confirmEmail(@Args('hash') hash: string): Promise<User> {
  //   // Retrun status instead of User
  //   return this.authService.confirmEmail(hash);
  // }

  // @UseGuards(JwtRefreshAuthGuard)
  // refresh(@CurrentUser() { id }: { id: string }): Promise<string> {
  //   const refreshToken = await this.authService.getUserRefreshToken(id);
  //   if (refreshToken) {
  //     return this.authService.generateAccessToken(id);
  //   }
  //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  // }
}
