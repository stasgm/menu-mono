import { Injectable } from '@nestjs/common';
import { ordersMock } from '@packages/mocks';

import { PrismaService } from '../../prisma.service';
import { createOrderLinesByLines, logInfo } from '../helpers';
import { ISeedService } from '../types';

@Injectable()
export class OrdersSeedService implements ISeedService {
  public readonly name = 'categories';

  constructor(private prisma: PrismaService) {}

  async removeAll() {
    logInfo(this.name, 'REMOVE');

    await this.prisma.orderLine.deleteMany();
    await this.prisma.order.deleteMany();
  }

  async seed() {
    logInfo(this.name);

    for await (const order of ordersMock) {
      await this.prisma.order.create({
        data: {
          id: order.id,
          date: new Date(order.date),
          userId: order.userId,
          totalAmount: order.totalAmount,
          totalProductQuantity: order.totalProductQuantity,
          lines: createOrderLinesByLines(order.orderLines),
        },
      });
    }
  }
}
