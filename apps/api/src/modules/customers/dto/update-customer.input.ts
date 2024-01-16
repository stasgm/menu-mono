import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateCustomerInput } from './create-customer.input';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @Field(() => String, { nullable: false })
  id: string;
}
