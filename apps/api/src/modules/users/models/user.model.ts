import { Field, ObjectType } from '@nestjs/graphql';

import { BaseNamedEntity } from '../../common/base.entity';
import { Customer } from '../../customers/models/customer.model';

@ObjectType({ description: 'User' })
export class User extends BaseNamedEntity {
  @Field(() => String)
  passwordHash: string;

  @Field(() => String)
  role: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Boolean)
  confirmed: boolean;

  // @Field(() => Customer)
  // customer: Customer;
}
