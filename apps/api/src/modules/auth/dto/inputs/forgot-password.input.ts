import { Field, InputType } from '@nestjs/graphql';

@InputType('ForgotPasswordInput', { description: 'Forgot password input' })
export class ForgotPasswordInput {
  @Field(() => String, { description: 'User email' })
  email: string;
}
