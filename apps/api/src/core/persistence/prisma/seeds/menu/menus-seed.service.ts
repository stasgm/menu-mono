import { Injectable } from '@nestjs/common';
import { getMenu } from '@packages/domains';
import { categoriesMock, menusMock, productsMock } from '@packages/mocks';

import { PrismaService } from '../../prisma.service';
import { createMenuLinesByLines, logInfo } from '../helpers';
import { ISeedService } from '../types';

@Injectable()
export class MenusSeedService implements ISeedService {
  public readonly name = 'menus';

  constructor(private prisma: PrismaService) {}

  async removeAll() {
    logInfo(this.name, 'REMOVE');

    await this.prisma.menuLine.deleteMany();
    await this.prisma.menu.deleteMany();
  }

  async seed() {
    logInfo(this.name);

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
