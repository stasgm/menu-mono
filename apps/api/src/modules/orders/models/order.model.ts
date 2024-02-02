import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/base.entity';
import { Customer } from '../../customers/models/customer.model';
import { OrderLine } from './order-line.model';

@ObjectType({ description: 'Order' })
export class Order extends BaseEntity {
  @Field(() => Date, { description: 'Order pickup date' })
  date: Date;

  @Field(() => Int, { description: 'Order number' })
  number: number;

  @Field(() => String, { description: 'Order status', defaultValue: 'NEW' })
  status: string;

  @Field(() => Customer)
  customer: Customer;

  @Field(() => [OrderLine], { nullable: 'itemsAndList' })
  lines?: OrderLine[];

  @Field(() => Int)
  totalAmount: number;

  @Field(() => Int)
  totalProductQuantity: number;
}
