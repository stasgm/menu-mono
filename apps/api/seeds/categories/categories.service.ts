import { Injectable } from '@nestjs/common';
import { categoriesMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { SeedService } from '../seed.service';

@Injectable()
export class CategoriesSeedService extends SeedService('category') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async removeAll() {
    super.removeAll();

    await this.model.deleteMany();
  }

  async seed() {
    super.seed();

    for await (const category of categoriesMock) {
      await this.model.create({ data: category });
    }
  }
}
