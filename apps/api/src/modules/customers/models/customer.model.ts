import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/base.entity';

@ObjectType({ description: 'Customer' })
export class Customer extends BaseEntity {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phoneNumber: string;
}
