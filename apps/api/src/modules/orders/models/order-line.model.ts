import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../../products/models/product.model';

@ObjectType({ description: 'Order Line' })
export class OrderLine extends BaseEntity {
  @Field(() => Product)
  product: Product;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  totalAmount: number;
}
