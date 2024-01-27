// import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Category } from '@prisma/client';

import { BaseResolver } from '../common/base.resolver';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { FindCategoriesArgs } from './dto/find-categories.args';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category as CategoryEntity } from './models/category.model';

@Resolver(() => CategoryEntity)
export class CategoriesResolver extends BaseResolver<
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
  FindCategoriesArgs
>(CategoryEntity, new FindCategoriesArgs(), CreateCategoryInput, UpdateCategoryInput) {
  constructor(readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }

  // @Query(() => [Category], { name: 'FindCategories', description: 'Find categories' })
  // findCategories(@Args() findCategoriesArgs: FindCategoriesArgs) {
  //   const { skip, take } = findCategoriesArgs;
  //   return this.categoriesService.findAll({ skip, take });
  // }

  // @Query(() => Category, { name: 'FindCategory', description: 'Find category by id' })
  // findCategory(@Args('id', { type: () => String }) id: string) {
  //   return this.categoriesService.findOne(id);
  // }

  // @Mutation(() => Category, { name: 'CreateCategory', description: 'Create category' })
  // create(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
  //   return this.categoriesService.create(createCategoryInput);
  // }

  // @Mutation(() => Category, { name: 'UpdateCategory', description: 'Update category' })
  // update(
  //   @Args('id', { type: () => String }) id: string,
  //   @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  // ) {
  //   return this.categoriesService.update(id, updateCategoryInput);
  // }

  // @Mutation(() => Category, { name: 'RemoveCategory', description: 'Remove category' })
  // remove(@Args('id', { type: () => String }) id: string) {
  //   return this.categoriesService.remove(id);
  // }
}
