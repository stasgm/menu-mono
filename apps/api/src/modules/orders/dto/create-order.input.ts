import { Field, InputType, Int } from '@nestjs/graphql';

import { CreateBaseInput } from '@/modules/common/base.dto';
import { Customer } from '@/modules/customers/models/customer.model';

import { CreateOrderLineInput } from './create-order-line.input';

@InputType('CreateOrderInput', { description: 'Create order input' })
export class CreateOrderInput extends CreateBaseInput {
  @Field(() => Date)
  date: Date;

  // TODO create two types for registered user and guest
  @Field(() => Customer, { nullable: 'items' })
  customer?: Customer;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => Int)
  totalAmount: number;

  @Field(() => Int)
  totalProductQuantity: number;

  @Field(() => [CreateOrderLineInput], { nullable: true })
  lines?: CreateOrderLineInput[];
}
