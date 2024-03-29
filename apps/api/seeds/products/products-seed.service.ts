import { Injectable } from '@nestjs/common';
import { productsMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { connectCategoriesByIds } from '../helpers';
import { SeedService } from '../seed.service';

@Injectable()
export class ProductsSeedService extends SeedService('product') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async removeAll() {
    super.removeAll();

    await this.model.deleteMany();
  }

  async seed() {
    super.seed();

    for await (const product of productsMock) {
      const categories = connectCategoriesByIds(product.categories);

      await this.model.create({
        data: {
          id: product.id,
          name: product.name,
          categories,
        },
      });
    }
  }
}
