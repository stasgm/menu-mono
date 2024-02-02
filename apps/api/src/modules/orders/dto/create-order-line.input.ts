import { Field, InputType, Int, PickType } from '@nestjs/graphql';

import { CreateBaseInput } from '../../common/base.dto';

@InputType()
export class CreateOrderLineInput extends CreateBaseInput {
  @Field(() => Int)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  productId: string;
}
