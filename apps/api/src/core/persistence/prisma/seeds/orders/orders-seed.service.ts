import { Injectable } from '@nestjs/common';
import { ordersMock } from '@packages/mocks';

import { PrismaService } from '../../prisma.service';
import { createOrderLinesByLines } from '../helpers';
import { SeedService } from '../types';

@Injectable()
export class OrdersSeedService extends SeedService {
  constructor(private prisma: PrismaService) {
    super('orders');
  }

  async removeAll() {
    this.logInfo('REMOVE');

    await this.prisma.orderLine.deleteMany();
    await this.prisma.order.deleteMany();
  }

  async seed() {
    this.logInfo('SEED');

    for await (const order of ordersMock) {
      await this.prisma.order.create({
        data: {
          id: order.id,
          date: new Date(order.date),
          customerId: order.customerId,
          totalAmount: order.totalAmount,
          totalProductQuantity: order.totalProductQuantity,
          lines: createOrderLinesByLines(order.orderLines),
        },
      });
    }
  }
}
