import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MenuLine {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  price: number;

  @Field(() => String)
  productId: string;
}
