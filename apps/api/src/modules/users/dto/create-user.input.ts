import { Field, HideField } from '@nestjs/graphql';

import { CreateBaseNamedInput } from '@/modules/common/base.dto';
import { Customer } from '@/modules/customers/models/customer.model';

// import { CreateCustomerInput } from '@/modules/customers/dto/create-customer.input';

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
