import { Injectable } from '@nestjs/common';
import { productsMock } from '@packages/mocks';

import { PrismaService } from '../../src/core/persistence/prisma/prisma.service';
import { connectCategoriesByIds } from '../helpers';
import { SeedService } from '../types';

@Injectable()
export class ProductsSeedService extends SeedService {
  constructor(private prisma: PrismaService) {
    super('products');
  }

  async removeAll() {
    this.logInfo('REMOVE');

    await this.prisma.product.deleteMany();
  }

  async seed() {
    this.logInfo('SEED');

    for await (const product of productsMock) {
      const categories = connectCategoriesByIds(product.categories);

      await this.prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          categories,
        },
      });
    }
  }
}
