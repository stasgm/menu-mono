import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Customer' })
export class Customer {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
}
