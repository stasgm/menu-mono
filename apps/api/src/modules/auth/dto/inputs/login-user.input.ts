import { Field, InputType } from '@nestjs/graphql';

@InputType('LoginUserInput', { description: 'Login user input' })
export class LoginUserInput {
  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
