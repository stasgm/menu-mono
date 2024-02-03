import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BaseRepository } from '@/modules/common/base.repository';

import { PrismaService } from '../../core/persistence/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesRepository extends BaseRepository(Category, 'category') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getCategories({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string) {
    return this.getCategoryById(id);
  }

  create(data: CreateCategoryInput) {
    return this.createCategory({ data });
  }

  update(id: string, data: UpdateCategoryInput) {
    return this.updateCategory({ data, where: { id } });
  }

  remove(id: string) {
    return this.deleteCategory({ where: { id } });
  }

  getCategory(params: { where: Prisma.CategoryWhereInput }) {
    const { where } = params;
    return this.prisma.category.findFirst({ where });
  }

  getCategoryById(id: string) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  getCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCategory(params: { data: CreateCategoryInput }): Promise<Category> {
    const { data } = params;

    return this.model.create({ data });
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: UpdateCategoryInput;
  }): Promise<Category | null> {
    const { where, data } = params;

    return this.prisma.category.update({
      where,
      data,
    });
  }

  async deleteCategory(params: { where: Prisma.CategoryWhereUniqueInput }): Promise<Category | null> {
    const { where } = params;

    return this.prisma.category.delete({ where });
  }
}
