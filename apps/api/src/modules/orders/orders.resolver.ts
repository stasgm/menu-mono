import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateOrderInput,
  UpdateOrderInput,
  UpdateOrderStatusInput,
} from '../../types/graphql.schema';
import { OrdersService } from './orders.service';

@Resolver('Order')
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query('orders')
  findAll() {
    return this.ordersService.findAll();
  }

  @Query('order')
  findOne(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation('createOrder')
  create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Mutation('updateOrder')
  update(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation('updateOrderStatus')
  updateStatus(
    @Args('updateOrderStatusInput')
    updateOrderStatusInput: UpdateOrderStatusInput
  ) {
    return this.ordersService.updateStatus(updateOrderStatusInput.id, updateOrderStatusInput);
  }

  @Mutation('removeOrder')
  remove(@Args('id') id: string) {
    return this.ordersService.remove(id);
  }
}
