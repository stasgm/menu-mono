import { Injectable } from '@nestjs/common';
import { activationCodesMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { SeedService } from '../seed.service';

@Injectable()
export class ActivationCodesSeedService extends SeedService('activationCode') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async removeAll() {
    super.removeAll();

    await this.model.deleteMany();
  }

  async seed() {
    super.seed();

    for await (const activationCode of activationCodesMock) {
      await this.model.create({
        data: activationCode,
      });
    }
  }
}
