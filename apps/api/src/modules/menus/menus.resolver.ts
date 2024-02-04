import { Resolver } from '@nestjs/graphql';

import { BaseResolver } from '@/modules/common/base.resolver';

import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { MenusService } from './menus.service';
import { Menu } from './models/menu.model';

@Resolver(() => Menu)
export class MenusResolver extends BaseResolver(Menu, Menu, CreateMenuInput, UpdateMenuInput) {
  constructor(private readonly menusService: MenusService) {
    super(menusService);
  }

  // @Mutation('createMenu')
  // create(@Args('createMenuInput') createMenuInput: CreateMenuInput) {
  //   return this.menusService.create(createMenuInput);
  // }

  // @Query('menus')
  // findAll() {
  //   return this.menusService.findAll();
  // }

  // @Query('menu')
  // findOne(@Args('id') id: string) {
  //   return this.menusService.findOne(id);
  // }

  // @Mutation('updateMenu')
  // update(@Args('updateMenuInput') updateMenuInput: UpdateMenuInput) {
  //   return this.menusService.update(updateMenuInput.id, updateMenuInput);
  // }

  // @Mutation('removeMenu')
  // remove(@Args('id') id: string) {
  //   return this.menusService.remove(id);
  // }
}
