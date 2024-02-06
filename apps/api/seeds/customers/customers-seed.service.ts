import { Injectable } from '@nestjs/common';
import { customersMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { SeedService } from '../seed.service';

@Injectable()
export class CustomersSeedService extends SeedService {
  constructor(private prisma: PrismaService) {
    super('customers');
  }

  async removeAll() {
    this.logInfo('REMOVE');

    await this.prisma.customer.deleteMany();
  }

  async seed() {
    this.logInfo('SEED');

    for await (const customer of customersMock) {
      await this.prisma.customer.create({
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
