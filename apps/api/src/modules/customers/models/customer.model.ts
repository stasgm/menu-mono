import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '@/modules/common/base.entity';

@ObjectType({ description: 'Customer' })
export class Customer extends BaseEntity {
  @Field(() => String, { description: 'First name' })
  firstName: string;

  @Field(() => String, { description: 'Last name' })
  lastName: string;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'Phone number' })
  phoneNumber: string;
}
