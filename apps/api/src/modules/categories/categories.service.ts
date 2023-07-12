import { Injectable } from '@nestjs/common';
import { ICategory } from '@packages/domains';
import { categoriesMock } from '@packages/mocks';

import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../../types/graphql.schema';

const tranformCategories = (categories: ICategory[]) => {
  return categories.map((cat) => ({ id: +cat.id, name: cat.name }));
};

@Injectable()
export class CategoriesService {
  private readonly categories: Category[] = tranformCategories(categoriesMock);

  create(createCategoryInput: CreateCategoryInput) {
    this.categories.push({
      id: +createCategoryInput.id,
      name: createCategoryInput.name,
    });

    return createCategoryInput;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find((p) => p.id === id);
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const index = this.categories.findIndex((p) => p.id !== id);
    this.categories[index] = updateCategoryInput;

    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((p) => p.id === id);
    const oldCategory = this.categories[index];
    this.categories.splice(index);

    return oldCategory;
  }
}
