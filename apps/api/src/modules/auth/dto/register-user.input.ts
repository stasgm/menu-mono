import { Field, InputType } from '@nestjs/graphql';

import { CreateBaseInput } from '../../common/base.dto';

@InputType('RegisterUserInput', { description: 'Register user input' })
export class RegisterUserInput extends CreateBaseInput {
  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
