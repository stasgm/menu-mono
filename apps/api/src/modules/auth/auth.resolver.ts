import { UseGuards } from '@nestjs/common';
import { Args, createUnionType, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserNotFoundException } from '@/core/exceptions';
import { User } from '@/modules/users/models/user.model';

import { AuthService } from './auth.service';
import { ContextData, CurrentUser, IContextData } from './decorators';
import { ActivateUserInput, LoginUserInput, RegisterUserInput } from './dto/inputs';
import { JwtAccessAuthGuard, JwtActivateAuthGuard, JwtRefreshAuthGuard } from './guards';
import { ActivationToken, Auth, Tokens } from './models';
import { IReqUserData } from './types';

export const LoginResultUnion = createUnionType({
  name: 'ResultUnion',
  types: () => [Auth, ActivationToken] as const,
  resolveType(value) {
    if (value.accessToken) {
      return Auth;
    }
    if (value.activationToken) {
      return ActivationToken;
    }
    return null;
  },
});

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: 'getCurrentUser', description: 'Get current user' })
  @UseGuards(JwtAccessAuthGuard)
  async currentUser(@CurrentUser() req: IReqUserData): Promise<User> {
    const user = await this.authService.getCurrentUser(req.user.id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  @Mutation(() => ActivationToken, { name: 'registerUser', description: 'User Registeration' })
  registerUser(
    @ContextData() ctx: IContextData,
    @Args({ type: () => RegisterUserInput, name: 'registerUserInput' }) data: RegisterUserInput
  ): Promise<ActivationToken> {
    return this.authService.register(data, ctx);
  }

  @Mutation(() => Auth, { name: 'activateUser', description: 'Activate user' })
  @UseGuards(JwtActivateAuthGuard)
  activateUser(
    @CurrentUser() req: IReqUserData,
    @ContextData() ctx: IContextData,
    @Args({ type: () => ActivateUserInput, name: 'activateUserInput' }) data: ActivateUserInput
  ): Promise<Auth> {
    return this.authService.activate(data, req.user.id, ctx);
  }

  @Mutation(() => LoginResultUnion, { name: 'loginUser', description: 'User login' })
  loginUser(
    @Args({ type: () => LoginUserInput, name: 'loginUserInput' }) data: LoginUserInput
  ): Promise<Auth | ActivationToken> {
    return this.authService.login(data);
  }

  // @Mutation(() => ResetPassword, { name: 'resetPassword', description: 'Reset password' })
  // resetPassword(): Promise<User> {
  //   // Retrun status instead of User
  //   return this.authService.confirmEmail(hash);
  // }

  @Mutation(() => Auth, { name: 'refreshTokens', description: 'Refresh tokens' })
  @UseGuards(JwtRefreshAuthGuard)
  refreshTokens(@CurrentUser() req: IReqUserData): Promise<Tokens> {
    return this.authService.refreshTokens({ sub: req.user.id, role: req.user.role });
  }
}
