import { Injectable } from '@nestjs/common';
import { usersMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { SeedService } from '../seed.service';

@Injectable()
export class UsersSeedService extends SeedService('user') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async removeAll() {
    super.removeAll();

    await this.model.deleteMany();
  }

  async seed() {
    super.seed();

    for await (const user of usersMock) {
      await this.model.create({ data: user });
    }
  }
}
