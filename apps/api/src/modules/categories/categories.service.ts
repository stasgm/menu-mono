import { Injectable } from '@nestjs/common';
// import { CreateCategoryInput } from './dto/create-category.input';
// import { UpdateCategoryInput } from './dto/update-category.input';

import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../../types/graphql.schema';
import { categories } from '@packages/mocks';

@Injectable()
export class CategoriesService {
  private readonly categories: Category[] = categories.map((cat) => ({
    id: +cat.id,
    name: cat.name,
  }));

  create(createCategoryInput: CreateCategoryInput) {
    return this.categories.push(createCategoryInput);
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find((p) => p.id === id);
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const idx = this.categories.findIndex((p) => p.id !== id);
    this.categories[idx] = updateCategoryInput;
    return this.categories[idx];
  }

  remove(id: number) {
    return this.categories.slice(this.categories.findIndex((p) => p.id !== id));
  }
}
