import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Category' })
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
