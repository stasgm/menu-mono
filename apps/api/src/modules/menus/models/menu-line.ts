import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MenuLine {
  @Field(() => ID)
  id: string;

  @Field(() => Number)
  price: number;

  @Field(() => ID)
  productId: string;
}
