import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { IResponse } from './types';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('register')
  register(@Args('name') name: string, @Args('password') password: string): Promise<IResponse> {
    return this.authService.register({ name, password });
  }

  @Mutation('login')
  login(@Args('name') name: string, @Args('password') password: string): Promise<IResponse> {
    return this.authService.login(name, password);
  }

  // @Mutation('confirm')
  // confirmEmail(@Args('hash') hash: string): Promise<User> {
  //   // Retrun status instead of User
  //   return this.authService.confirmEmail(hash);
  // }

  @Mutation('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@CurrentUser() { id }: { id: string }): Promise<IResponse> {
    return this.authService.refreshTokens(id);
  }
}
