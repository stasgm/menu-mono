import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuLineInput {
  @Field()
  price: number;

  @Field()
  productId: string;
}
