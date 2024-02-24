import { Resolver } from '@nestjs/graphql';

import { BaseResolver } from '@/modules/common/base.resolver';

import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/inputs/create-category.input';
import { UpdateCategoryInput } from './dto/inputs/update-category.input';
import { Category } from './models/category.model';

@Resolver(() => Category)
export class CategoriesResolver extends BaseResolver(Category, Category, CreateCategoryInput, UpdateCategoryInput) {
  constructor(readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
