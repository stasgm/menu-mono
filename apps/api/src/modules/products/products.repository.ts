import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { CreateProductInput, UpdateProductInput } from '../../types/graphql.schema';
import { PrismaService } from '../_core/persistence/prisma/prisma.service';

const productInclude = Prisma.validator<Prisma.ProductInclude>()({
  _count: {
    select: {
      categories: true,
    },
  },
  categories: true,
});

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async createProduct(params: { data: CreateProductInput }): Promise<Product> {
    const { data } = params;

    return this.prisma.product.create({
      data: {
        name: data.name,
        disabled: data.disabled,
        categories: this.connectCategoriesById(data.categories),
      },
      include: productInclude,
    });
  }

  getProduct(params: { where: Prisma.ProductWhereInput }) {
    const { where } = params;
    return this.prisma.product.findFirst({ where, include: productInclude });
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
      include: productInclude,
    });
  }

  async getProducts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      include: productInclude,
      orderBy,
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: UpdateProductInput;
  }): Promise<Product> {
    const { where, data } = params;

    return this.prisma.product.update({
      where,
      data: {
        name: data.name,
        disabled: data.disabled,
        categories: this.connectCategoriesById(data.categories),
      },
      include: productInclude,
    });
  }

  async deleteProduct(params: { where: Prisma.ProductWhereUniqueInput }): Promise<Product> {
    const { where } = params;
    return this.prisma.product.delete({ where, include: productInclude });
  }

  /**
   * Format the categories IDs array into the prisma query way
   */
  private connectCategoriesById(
    category: Array<string | null>,
  ): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput {
    const categories = category.reduce((acc, cur) => {
      if (!cur) {
        return acc;
      }

      return [...acc, { id: cur }];
    }, [] as Prisma.CategoryWhereUniqueInput[]);

    return {
      connect: categories,
    };
  }
}
