import { Field, InputType } from '@nestjs/graphql';

import { CreateCustomerInput } from '@/modules/customers/dto/inputs/create-customer.input';

@InputType('RegisterUserInput', { description: 'Register user input' })
export class RegisterUserInput {
  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => CreateCustomerInput, { description: 'Customer' })
  customer: CreateCustomerInput;
}
