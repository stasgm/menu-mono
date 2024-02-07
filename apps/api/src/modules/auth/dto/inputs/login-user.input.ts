import { Field, InputType } from '@nestjs/graphql';

import { CreateBaseInput } from '@/modules/common/base.dto';

@InputType('LoginUserInput', { description: 'Login user input' })
export class LoginUserInput extends CreateBaseInput {
  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
