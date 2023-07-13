import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCategoryInput, UpdateCategoryInput } from '../../types/graphql.schema';
import { CategoriesService } from './categories.service';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation('createCategory')
  create(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query('categories')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query('category')
  findOne(@Args('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Mutation('updateCategory')
  update(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    return this.categoriesService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Mutation('removeCategory')
  remove(@Args('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
