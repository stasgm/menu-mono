import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';

import { CreateCategoryInput, UpdateCategoryInput } from '../../types/graphql.schema';
import { PrismaService } from '../_core/persistence/prisma/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async createCategory(params: { data: CreateCategoryInput }): Promise<Category> {
    const { data } = params;

    return this.prisma.category.create({
      data: {
        name: data.name,
      },
    });
  }

  getCategory(params: { where: Prisma.CategoryWhereInput }) {
    const { where } = params;
    return this.prisma.category.findFirst({ where });
  }

  getCategoryById(id: number) {
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
      data: {
        name: data.name,
      },
    });
  }

  async deleteCategory(params: { where: Prisma.CategoryWhereUniqueInput }): Promise<Category> {
    const { where } = params;
    return this.prisma.category.delete({ where });
  }
}
