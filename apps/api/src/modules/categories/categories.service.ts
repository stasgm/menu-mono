import { Injectable } from '@nestjs/common';

import { CreateCategoryInput, UpdateCategoryInput } from '../../types/graphql.schema';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  create(createCategoryInput: CreateCategoryInput) {
    return this.categoriesRepository.createCategory({
      data: createCategoryInput,
    });
  }

  findAll() {
    return this.categoriesRepository.getCategories({});
  }

  findOne(id: string) {
    return this.categoriesRepository.getCategoryById(id);
  }

  findByName(name: string) {
    return this.categoriesRepository.getCategory({ where: { name } });
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.categoriesRepository.updateCategory({
      where: {
        id,
      },
      data: updateCategoryInput,
    });
  }

  remove(id: string) {
    return this.categoriesRepository.deleteCategory({ where: { id } });
  }
}
