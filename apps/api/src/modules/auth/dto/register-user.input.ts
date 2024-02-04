import { Field, InputType } from '@nestjs/graphql';

import { CreateBaseNamedInput } from '@/modules/common/base.dto';
import { CreateCustomerInput } from '@/modules/customers/dto/create-customer.input';

@InputType('RegisterUserInput', { description: 'Register user input' })
export class RegisterUserInput extends CreateBaseNamedInput {
  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => CreateCustomerInput, { description: 'Customer' })
  customer: CreateCustomerInput;
}
