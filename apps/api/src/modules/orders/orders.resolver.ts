import { Resolver } from '@nestjs/graphql';

import { BaseResolver } from '../common/base.resolver';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './models/order.model';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrdersResolver extends BaseResolver(Order, CreateOrderInput, UpdateOrderInput) {
  constructor(readonly ordersService: OrdersService) {
    super(ordersService);
  }

  // @Mutation('updateOrderStatus')
  // updateStatus(
  //   @Args('updateOrderStatusInput')
  //   updateOrderStatusInput: UpdateOrderStatusInput
  // ) {
  //   return this.ordersService.updateStatus(updateOrderStatusInput.id, updateOrderStatusInput);
  // }
}
