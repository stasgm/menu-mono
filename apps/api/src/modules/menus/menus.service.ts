import { Injectable } from '@nestjs/common';

import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { MenusRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(private menusRepository: MenusRepository) {}

  create(createMenuInput: CreateMenuInput) {
    return this.menusRepository.createMenu({ data: createMenuInput });
  }

  findAll() {
    return this.menusRepository.getMenus({});
  }

  findOne(id: string) {
    return this.menusRepository.getMenuById(id);
  }

  update(id: string, updateMenuInput: UpdateMenuInput) {
    return this.menusRepository.updateMenu({
      where: {
        id,
      },
      data: updateMenuInput,
    });
  }

  remove(id: string) {
    return this.menusRepository.deleteMenu({ where: { id } });
  }
}
