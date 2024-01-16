import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  passwordHash: string;

  @Field(() => String)
  role: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => ID)
  customerId: string;
}
