import { Field, InputType, Int } from '@nestjs/graphql';

import { CreateBaseInput } from '@/modules/common/base.dto';
import { Product } from '@/modules/products/models/product.model';

@InputType()
export class CreateOrderLineInput extends CreateBaseInput {
  @Field(() => Int)
  price: number;

  @Field(() => Int)
  quantity: number;

  // @Field(() => Int)
  // productId: string;

  @Field(() => Product)
  product: Product;
}
