import { Injectable } from '@nestjs/common';

import { CreateOrderInput, UpdateOrderInput } from '../../types/graphql.schema';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  create(createOrderInput: CreateOrderInput) {
    return this.ordersRepository.createOrder({ data: createOrderInput });
  }

  findAll() {
    return this.ordersRepository.getOrders({});
  }

  findOne(id: string) {
    return this.ordersRepository.getOrderById(id);
  }

  update(id: string, updateOrderInput: UpdateOrderInput) {
    return this.ordersRepository.updateOrder({
      where: {
        id,
      },
      data: updateOrderInput,
    });
  }

  remove(id: string) {
    return this.ordersRepository.deleteOrder({ where: { id } });
  }
}
