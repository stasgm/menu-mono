import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateOrderInput, UpdateOrderInput } from '../../types/graphql.schema';
import { OrdersService } from './orders.service';

@Resolver('Order')
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation('createOrder')
  create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query('orders')
  findAll() {
    return this.ordersService.findAll();
  }

  @Query('order')
  findOne(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation('updateOrder')
  update(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation('removeOrder')
  remove(@Args('id') id: string) {
    return this.ordersService.remove(id);
  }
}
