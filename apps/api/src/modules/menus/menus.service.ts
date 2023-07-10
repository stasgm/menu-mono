import { Injectable } from '@nestjs/common';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';

import { menu } from '@packages/domains';
import { Menu } from '../../graphql.schema';

@Injectable()
export class MenusService {
  private readonly menus: Menu[] = [
    {
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
    },
  ];

  async create(createMenuInput: CreateMenuInput) {
    return this.menus.push(createMenuInput);
  }

  findAll() {
    return this.menus;
  }

  async findOne(id: number) {
    return this.menus.find((p) => p.id === id);
  }

  async update(id: number, updateMenuInput: UpdateMenuInput) {
    const idx = this.menus.findIndex((p) => p.id !== id);
    this.menus[idx] = updateMenuInput;
    return this.menus[idx];
  }

  async remove(id: number) {
    return this.menus.slice(this.menus.findIndex((p) => p.id !== id));
  }
}
