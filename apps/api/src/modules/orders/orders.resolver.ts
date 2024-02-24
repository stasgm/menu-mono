import { Resolver } from '@nestjs/graphql';

import { BaseResolver } from '@/modules/common/base.resolver';

import { CreateOrderInput } from './dto/inputs/create-order.input';
import { UpdateOrderInput } from './dto/inputs/update-order.input';
import { Order, OrderWithKeys } from './models/order.model';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrdersResolver extends BaseResolver(Order, OrderWithKeys, CreateOrderInput, UpdateOrderInput) {
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
