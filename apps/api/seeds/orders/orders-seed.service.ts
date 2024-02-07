import { Injectable } from '@nestjs/common';
import { ordersMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { createOrderLinesByLines } from '../helpers';
import { SeedService } from '../seed.service';

@Injectable()
export class OrdersSeedService extends SeedService('order') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async removeAll() {
    super.removeAll();

    await this.prisma.orderLine.deleteMany();
    await this.model.deleteMany();
  }

  async seed() {
    super.seed();

    for await (const order of ordersMock) {
      await this.model.create({
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
