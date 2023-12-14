// import { HttpException, HttpStatus,UseGuards } from '@nestjs/common';
import { Args } from '@nestjs/graphql';

import { User } from '../../types/graphql.schema';
import { AuthService } from './auth.service';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';

export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  async register(@Args('name') name: string, @Args('password') password: string): Promise<User> {
    return await this.authService.register({ name, password });
  }

  // async login(
  //   @Args('email') email: string,
  //   @Args('password') password: string
  // ): Promise<MutationResponse> {
  //   return this.authService.login(email, password);
  // }

  // @UseGuards(JwtRefreshAuthGuard)
  // async refresh(@CurrentUser() { id }: { id: string }): Promise<string> {
  //   const refreshToken = await this.authService.getUserRefreshToken(id);
  //   if (refreshToken) {
  //     return this.authService.generateAccessToken(id);
  //   }
  //   throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  // }
}
