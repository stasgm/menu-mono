import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateMenuInput, UpdateMenuInput } from '../../types/graphql.schema';
import { MenusService } from './menus.service';

@Resolver('Menu')
export class MenusResolver {
  constructor(private readonly menusService: MenusService) {}

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
