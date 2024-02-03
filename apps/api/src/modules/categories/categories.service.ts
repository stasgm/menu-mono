import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/common/base.service';

import { CategoriesRepository } from './categories.repository';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService extends BaseService(Category) {
  constructor(readonly categoriesRepository: CategoriesRepository) {
    super(categoriesRepository);
  }

  findByName(name: string) {
    return this.categoriesRepository.getCategory({ where: { name } });
  }
}
