import { Injectable } from '@nestjs/common';
import { productsMock } from '@packages/mocks';

import { PrismaService } from '../../prisma.service';
import { connectCategoriesByIds, logInfo } from '../helpers';
import { ISeedService } from '../types';

@Injectable()
export class ProductsSeedService implements ISeedService {
  public readonly name = 'products';

  constructor(private prisma: PrismaService) {}

  async removeAll() {
    logInfo(this.name, 'REMOVE');

    await this.prisma.product.deleteMany();
  }

  async seed() {
    logInfo(this.name);

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
