import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserNotFoundException } from '@/core/exceptions';
import { User } from '@/modules/users/models/user.model';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { JwtAccessAuthGuard } from './guards/jwt-access.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { Auth } from './models/auth.model';
import { Tokens } from './models/tokens.model';
import { IReqUserData } from './types';

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

  @Mutation(() => Auth, { name: 'registerUser', description: 'User Registeration' })
  registerUser(
    @Args({ type: () => RegisterUserInput, name: 'registerUserInput' }) data: RegisterUserInput
  ): Promise<Auth> {
    return this.authService.register(data);
  }

  @Mutation(() => Auth, { name: 'loginUser', description: 'User login' })
  loginUser(@Args({ type: () => LoginUserInput, name: 'loginUserInput' }) data: LoginUserInput): Promise<Auth> {
    return this.authService.login(data);
  }

  // @Mutation(() => ConfirmEmail, { name: 'confirmEmail', description: 'Confirm Email' })
  // confirmEmail(@Args('hash') hash: string): Promise<User> {
  //   // Retrun status instead of User
  //   return this.authService.confirmEmail(hash);
  // }

  // @Mutation(() => ResetPassword, { name: 'resetPassword', description: 'Reset password' })
  // resetPassword(): Promise<User> {
  //   // Retrun status instead of User
  //   return this.authService.confirmEmail(hash);
  // }

  @Mutation(() => Tokens)
  @UseGuards(JwtRefreshAuthGuard)
  refreshTokens(@CurrentUser() req: IReqUserData): Promise<Tokens> {
    return this.authService.refreshTokens({ sub: req.user.id, role: req.user.role });
  }
}
