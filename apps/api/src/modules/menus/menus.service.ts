import { Injectable } from '@nestjs/common';
import { IMenu } from '@packages/domains';
import { menuMock } from '@packages/mocks';

import {
  CreateMenuInput,
  CreateMenuLineInput,
  Menu,
  MenuLine,
  UpdateMenuInput,
} from '../../types/graphql.schema';
import { tranformProduct } from '../products/products.service';

const tranformLines = (lines: Array<CreateMenuLineInput | null>): MenuLine[] => {
  return lines.reduce((acc, cur) => {
    if (!cur) {
      return acc;
    }

    const product = tranformProduct(cur.productId);

    if (!product) {
      return acc;
    }

    return [
      ...acc,
      {
        id: cur.id,
        price: cur.price,
        product,
      },
    ];
  }, [] as MenuLine[]);
};

const transformMenu = (createMenuInput: CreateMenuInput): Menu => {
  return {
    ...createMenuInput,
    lines: tranformLines(createMenuInput.lines),
  };
};

const transformMenues = (menues: IMenu[]): Menu[] => {
  return menues.map((menu) => ({
    id: +menu.id,
    name: menu.name,
    lines: menu.lines.map((l) => ({
      id: +l.id,
      price: l.price,
      product: {
        id: +l.product.id,
        name: l.product.name,
        categories: l.product.categories.map((cat) => ({
          id: +cat.id,
          name: cat.name,
        })),
      },
    })),
  }));
};

@Injectable()
export class MenusService {
  private readonly menus: Menu[] = transformMenues([menuMock]);

  async create(createMenuInput: CreateMenuInput) {
    const menu = transformMenu(createMenuInput);

    this.menus.push(menu);

    return menu;
  }

  findAll() {
    return this.menus;
  }

  async findOne(id: number) {
    return this.menus.find((p) => p.id === id);
  }

  async update(id: number, updateMenuInput: UpdateMenuInput) {
    const index = this.menus.findIndex((p) => p.id === id);
    const menu = transformMenu(updateMenuInput);
    this.menus[index] = menu;

    return menu;
  }

  async remove(id: number) {
    const index = this.menus.findIndex((p) => p.id === id);
    const oldMenu = this.menus[index];
    this.menus.splice(index);

    return oldMenu;
  }
}
