import { Field, HideField, ID, ObjectType, OmitType } from '@nestjs/graphql';

import { BaseNamedEntity } from '@/modules/common/base.entity';
import { Customer } from '@/modules/customers/models/customer.model';

@ObjectType({ description: 'User' })
export class User extends BaseNamedEntity {
  @HideField()
  passwordHash: string;

  @Field(() => String, { description: 'User role' })
  role: string;

  @Field(() => String, { description: 'User activity status' })
  active: boolean;

  @Field(() => String, { description: 'User confirmation status' })
  confirmed: boolean;

  @Field(() => Customer, { description: 'Customer' })
  customer: Customer;
}

@ObjectType({ description: 'UserWithKeys' })
export class UserWithKeys extends OmitType(User, ['customer'] as const) {
  @Field(() => ID, { description: 'Customer Id' })
  customerId: string;
}
