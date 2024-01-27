import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';

import { PrismaService } from '../../core/persistence/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async createCategory(params: { data: CreateCategoryInput }): Promise<Category> {
    const { data } = params;

    return this.prisma.category.create({ data });
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

  async getCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
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

  async deleteCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
  }): Promise<Category | null> {
    const { where } = params;

    return this.prisma.category.delete({ where });
  }
}
