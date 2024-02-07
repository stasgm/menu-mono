import { Injectable } from '@nestjs/common';
import { customersMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { SeedService } from '../seed.service';

@Injectable()
export class CustomersSeedService extends SeedService('customer') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async removeAll() {
    super.removeAll();

    await this.model.deleteMany();
  }

  async seed() {
    super.seed();

    for await (const customer of customersMock) {
      await this.model.create({
        data: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
        },
      });
    }
  }
}
