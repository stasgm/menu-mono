import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '@/modules/users/models/user.model';

import { AuthService } from './auth.service';
import { ContextData, CurrentUser } from './decorators';
import { ActivateUserInput, LoginUserInput, RegisterUserInput } from './dto/inputs';
import { ActivationToken, Auth, LoginResultUnion, Tokens } from './dto/results';
import { JwtAccessAuthGuard, JwtActivateAuthGuard, JwtRefreshAuthGuard } from './guards';
import { IContextData, IReqUserData } from './types';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Query(() => User, { name: 'getCurrentUser', description: 'Get current user' })
  currentUser(@CurrentUser() req: IReqUserData): Promise<User> {
    return this.authService.getCurrentUser(req.user.id);
  }

  @Mutation(() => ActivationToken, { name: 'registerUser', description: 'User Registeration' })
  registerUser(
    @ContextData() ctx: IContextData,
    @Args({ type: () => RegisterUserInput, name: 'registerUserInput' }) data: RegisterUserInput
  ): Promise<ActivationToken> {
    return this.authService.register(data, ctx);
  }

  @UseGuards(JwtActivateAuthGuard)
  @Mutation(() => Auth, { name: 'activateUser', description: 'Activate user' })
  activateUser(
    @CurrentUser() req: IReqUserData,
    @ContextData() ctx: IContextData,
    @Args({ type: () => ActivateUserInput, name: 'activateUserInput' }) data: ActivateUserInput
  ): Promise<Auth> {
    return this.authService.activate(data, req.user.id, ctx);
  }

  @UseGuards(JwtActivateAuthGuard)
  @Mutation(() => ActivationToken, { name: 'refreshActivationCode', description: 'Refresh activation code' })
  refreshActivationCode(@CurrentUser() req: IReqUserData, @ContextData() ctx: IContextData): Promise<ActivationToken> {
    return this.authService.refreshActivationCode(req.user.id, ctx);
  }

  @Mutation(() => LoginResultUnion, { name: 'loginUser', description: 'User login' })
  loginUser(
    @Args({ type: () => LoginUserInput, name: 'loginUserInput' }) data: LoginUserInput
  ): Promise<Auth | ActivationToken> {
    return this.authService.login(data);
  }

  // @Mutation(() => ResetPassword, { name: 'forgotPassword', description: 'Forgot password' })
  // forgotPassword(
  //   @Args({ type: () => ForgotPasswordInput, name: 'forgotPasswordInput' }) data: forgotPasswordInput
  // ): Promise<SuccessfulResponse> {
  //   return this.authService.forgotEmail(forgotPasswordInput);
  // }

  // @Mutation(() => ResetPassword, { name: 'resetPassword', description: 'Reset password' })
  // @UseGuards(JwtAccessAuthGuard)
  // resetPassword(
  //   @Args({ type: () => ResetPasswordInput, name: 'resetPasswordInput' }) data: resetPasswordInput
  // ): Promise<SuccessfulResponse> {
  //   return this.authService.resetPassword(resetPasswordInput);
  // }

  @UseGuards(JwtRefreshAuthGuard)
  @Mutation(() => Tokens, { name: 'refreshTokens', description: 'Refresh tokens' })
  refreshTokens(@CurrentUser() req: IReqUserData): Promise<Tokens> {
    return this.authService.refreshTokens({ sub: req.user.id, role: req.user.role });
  }
}
