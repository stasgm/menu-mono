import { Injectable } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';

import { CreateMenuInput, CreateMenuLineInput, UpdateMenuInput } from '../../types/graphql.schema';
import { PrismaService } from '../_core/persistence/prisma/prisma.service';

const menuInclude = Prisma.validator<Prisma.MenuInclude>()({
  _count: {
    select: {
      lines: true,
    },
  },
  lines: {
    include: {
      product: {
        include: {
          categories: true,
        },
      },
    },
  },
});

const createMenuLinesByLines = (
  menuLines: Array<CreateMenuLineInput | null>,
): Prisma.MenuLineUncheckedCreateNestedManyWithoutMenuInput => {
  const createMenuLines: Prisma.MenuLineUncheckedCreateWithoutMenuInput[] = menuLines.reduce(
    (acc, cur) => {
      if (!cur) {
        return acc;
      }

      return [
        ...acc,
        {
          price: cur.price,
          productId: cur.productId,
        },
      ];
    },
    [] as Prisma.MenuLineUncheckedCreateWithoutMenuInput[],
  );

  return {
    create: createMenuLines,
  };
};

@Injectable()
export class MenusRepository {
  constructor(private prisma: PrismaService) {}

  async createMenu(params: { data: CreateMenuInput }): Promise<Menu> {
    const { data } = params;

    const lines = createMenuLinesByLines(data.lines);

    return this.prisma.menu.create({
      data: {
        name: data.name,
        lines,
      },
      include: menuInclude,
    });
  }

  getMenu(params: { where: Prisma.MenuWhereInput }) {
    const { where } = params;
    return this.prisma.menu.findFirst({ where, include: menuInclude });
  }

  getMenuById(id: string) {
    return this.prisma.menu.findUnique({
      where: {
        id,
      },
      include: menuInclude,
    });
  }

  async getMenus(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MenuWhereUniqueInput;
    where?: Prisma.MenuWhereInput;
    orderBy?: Prisma.MenuOrderByWithRelationInput;
  }): Promise<Menu[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.menu.findMany({
      skip,
      include: menuInclude,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateMenu(params: {
    where: Prisma.MenuWhereUniqueInput;
    data: UpdateMenuInput;
  }): Promise<Menu | null> {
    const { where, data } = params;

    // TODO: UPDATE NOT CREATE
    const lines = createMenuLinesByLines(data.lines);

    return this.prisma.menu.update({
      where,
      data: {
        name: data.name,
        lines,
      },
      include: menuInclude,
    });
  }

  async deleteMenu(params: { where: Prisma.MenuWhereUniqueInput }): Promise<Menu> {
    const { where } = params;
    return this.prisma.menu.delete({ where });
  }
}
