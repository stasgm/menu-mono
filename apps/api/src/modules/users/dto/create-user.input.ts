import { Field, HideField, InputType } from '@nestjs/graphql';

import { CreateBaseNamedInput } from '@/modules/common/base.dto';

@InputType('CreateUserInput', { description: 'Create user input' })
export class CreateUserInput extends CreateBaseNamedInput {
  @HideField()
  passwordHash: string;

  @HideField()
  customerId: string;

  @Field(() => String, { description: 'User role' })
  role: string;

  @Field(() => String, { description: 'User activity status' })
  active: boolean;

  @Field(() => String, { description: 'User confirmation status' })
  confirmed: boolean;
}
