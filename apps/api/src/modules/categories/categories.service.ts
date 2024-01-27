import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { BaseService } from '../common/base.service';
import { CategoriesRepository } from './categories.repository';
// import { CreateCategoryInput } from './dto/create-category.input';
// import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(readonly categoriesRepository: CategoriesRepository) {
    super(categoriesRepository);
  }

  // findAll(params: { skip?: number; take?: number }) {
  //   const { skip = 0, take = 100 } = params;
  //   return this.categoriesRepository.getCategories({ skip, take });
  // }

  // findOne(id: string) {
  //   return this.categoriesRepository.getCategoryById(id);
  // }

  // findByName(name: string) {
  //   return this.categoriesRepository.getCategory({ where: { name } });
  // }

  // create(createCategoryInput: CreateCategoryInput) {
  //   return this.categoriesRepository.createCategory({
  //     data: createCategoryInput,
  //   });
  // }

  // update(id: string, updateCategoryInput: UpdateCategoryInput) {
  //   return this.categoriesRepository.updateCategory({
  //     where: {
  //       id,
  //     },
  //     data: updateCategoryInput,
  //   });
  // }

  // remove(id: string) {
  //   return this.categoriesRepository.deleteCategory({ where: { id } });
  // }
}
