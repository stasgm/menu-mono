import { Resolver } from '@nestjs/graphql';

// import { Category } from '@prisma/client';
import { BaseResolver } from '@/modules/common/base.resolver';

import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './models/category.model';

@Resolver(() => Category)
export class CategoriesResolver extends BaseResolver(Category, CreateCategoryInput, UpdateCategoryInput) {
  constructor(readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
