import { Field, InputType } from '@nestjs/graphql';

@InputType('ResetPasswordInput', { description: 'Reset password input' })
export class ResetPasswordInput {
  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User new password' })
  password: string;
}
