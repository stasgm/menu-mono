import { Injectable } from '@nestjs/common';
import { usersMock } from '@packages/mocks';

import { PrismaService } from '../../src/core/persistence/prisma/prisma.service';
import { SeedService } from '../types';

@Injectable()
export class UsersSeedService extends SeedService {
  constructor(private prisma: PrismaService) {
    super('users');
  }

  async removeAll() {
    this.logInfo('REMOVE');

    await this.prisma.user.deleteMany();
  }

  async seed() {
    this.logInfo('SEED');

    for await (const user of usersMock) {
      await this.prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          passwordHash: user.passwordHash,
          active: user.active,
          confirmed: user.confirmed,
          role: user.role,
          customerId: user.customerId,
        },
      });
    }
  }
}
