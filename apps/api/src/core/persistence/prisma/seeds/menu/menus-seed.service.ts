import { Injectable } from '@nestjs/common';
import { getMenu } from '@packages/domains';
import { categoriesMock, menusMock, productsMock } from '@packages/mocks';

import { PrismaService } from '../../prisma.service';
import { createMenuLinesByLines } from '../helpers';
import { SeedService } from '../types';

@Injectable()
export class MenusSeedService extends SeedService {
  constructor(private prisma: PrismaService) {
    super('menus');
  }

  async removeAll() {
    this.logInfo('REMOVE');

    await this.prisma.menuLine.deleteMany();
    await this.prisma.menu.deleteMany();
  }

  async seed() {
    this.logInfo('SEED');

    for await (const menu of menusMock) {
      await this.prisma.menu.create({
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
