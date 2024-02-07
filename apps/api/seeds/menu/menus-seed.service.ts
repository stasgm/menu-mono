import { Injectable } from '@nestjs/common';
import { getMenu } from '@packages/domains';
import { categoriesMock, menusMock, productsMock } from '@packages/mocks';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { createMenuLinesByLines } from '../helpers';
import { SeedService } from '../seed.service';

@Injectable()
export class MenusSeedService extends SeedService('menu') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  async removeAll() {
    super.removeAll();

    await this.prisma.menuLine.deleteMany();
    await this.model.deleteMany();
  }

  async seed() {
    super.seed();

    for await (const menu of menusMock) {
      await this.model.create({
        data: {
          id: menu.id,
          number: menu.number,
          name: menu.name,
          lines: createMenuLinesByLines(getMenu(menu, productsMock, categoriesMock).lines),
        },
      });
    }
  }
}
