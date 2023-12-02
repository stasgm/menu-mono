import { Injectable } from '@nestjs/common';
import { categoriesMock } from '@packages/mocks';

import { PrismaService } from '../../prisma.service';
import { logInfo } from '../helpers';
import { ISeedService } from '../types';

@Injectable()
export class CategoriesSeedService implements ISeedService {
  public name = 'categories';

  constructor(private prisma: PrismaService) {}

  async removeAll() {
    logInfo(this.name, 'REMOVE');

    await this.prisma.category.deleteMany();
  }

  async seed() {
    logInfo(this.name);

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
