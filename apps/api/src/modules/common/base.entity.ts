import { Field, ID, ObjectType } from '@nestjs/graphql';

// TODO change type string to Date for date fields
@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  // @Field()
  // createdAt: string;

  // @Field()
  // updatedAt: string;

  // @Field()
  // deletedAt: string | null;
}
