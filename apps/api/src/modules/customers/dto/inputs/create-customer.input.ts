import { Field, InputType } from '@nestjs/graphql';

import { CreateBaseInput } from '@/modules/common/base.dto';

@InputType('CreateCustomerInput', { description: 'Create user input' })
export class CreateCustomerInput extends CreateBaseInput {
  @Field(() => String, { description: 'First name' })
  firstName: string;

  @Field(() => String, { description: 'Last name' })
  lastName: string;

  @Field(() => String, { description: 'Email' })
  email: string;

  @Field(() => String, { description: 'Phone number' })
  phoneNumber: string;
}
