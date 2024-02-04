import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/common/base.service';

// import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { Order, OrderWithKeys } from './models/order.model';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService extends BaseService(Order, OrderWithKeys) {
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
