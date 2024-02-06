import { Injectable } from '@nestjs/common';
import { categoriesMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { SeedService } from '../seed.service';

@Injectable()
export class CategoriesSeedService extends SeedService {
  constructor(private prisma: PrismaService) {
    super('categories');
  }

  async removeAll() {
    this.logInfo('REMOVE');

    await this.prisma.category.deleteMany();
  }

  async seed() {
    this.logInfo('SEED');

    for await (const category of categoriesMock) {
      await this.prisma.category.create({
        data: {
          id: category.id,
          name: category.name,
        },
      });
    }
  }
}
