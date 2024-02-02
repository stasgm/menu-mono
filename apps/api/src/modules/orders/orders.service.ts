import { Injectable } from '@nestjs/common';

import { BaseService } from '../common/base.service';
// import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { Order } from './models/order.model';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService extends BaseService(Order) {
  constructor(readonly ordersRepository: OrdersRepository) {
    super(ordersRepository);
  }

  // updateStatus(id: string, updateOrderStatusInput: UpdateOrderStatusInput) {
  //   return this.ordersRepository.updateOrderStatus({
  //     where: {
  //       id,
  //     },
  //     data: updateOrderStatusInput,
  //   });
  // }
}
