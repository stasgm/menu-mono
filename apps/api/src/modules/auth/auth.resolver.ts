/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { Auth } from './models/auth.model';
import { IResponse } from './types';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth, { name: `registerUser`, description: `Register user` })
  register(
    @Args({ type: () => RegisterUserInput, name: `registerUserInput` }) data: RegisterUserInput
  ): Promise<IResponse> {
    return this.authService.register(data);
  }

  @Mutation(() => Auth, { name: `loginUser`, description: `Login user` })
  login(@Args({ type: () => LoginUserInput, name: `loginUserInput` }) data: LoginUserInput): Promise<IResponse> {
    return this.authService.login(data);
  }

  // @Mutation('confirm')
  // confirmEmail(@Args('hash') hash: string): Promise<User> {
  //   // Retrun status instead of User
  //   return this.authService.confirmEmail(hash);
  // }

  @Mutation(() => Auth)
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@CurrentUser() { id }: { id: string }): Promise<IResponse> {
    return this.authService.refreshTokens(id);
  }
}
