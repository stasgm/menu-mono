import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './models/product.model';

const productInclude = Prisma.validator<Prisma.ProductInclude>()({
  categories: true,
});

@Injectable()
export class ProductsRepository extends BaseRepository(Product, 'product') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getProducts({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string) {
    return this.getProductById(id);
  }

  create(data: CreateProductInput) {
    return this.createProduct({ data });
  }

  update(id: string, data: UpdateProductInput) {
    return this.updateProduct({ data, where: { id } });
  }

  remove(id: string) {
    return this.deleteProduct({ where: { id } });
  }

  private async createProduct(params: { data: CreateProductInput }) {
    const { data } = params;

    return this.prisma.product.create({
      data: {
        name: data.name,
        disabled: data.disabled,
        // categories: this.connectCategoriesById(data.categories),
      },
      include: productInclude,
    });
  }

  // private getProduct(params: { where: Prisma.ProductWhereInput }) {
  //   const { where } = params;
  //   return this.prisma.product.findFirst({ where, include: productInclude });
  // }

  private getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
      include: productInclude,
    });
  }

  private async getProducts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      include: productInclude,
      orderBy,
    });
  }

  private async updateProduct(params: { where: Prisma.ProductWhereUniqueInput; data: UpdateProductInput }) {
    const { where, data } = params;

    return this.prisma.product.update({
      where,
      data: {
        name: data.name,
        disabled: data.disabled,
        // categories: this.connectCategoriesById(data.categories ?? []),
      },
      include: productInclude,
    });
  }

  private async deleteProduct(params: { where: Prisma.ProductWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.product.delete({ where, include: productInclude });
  }

  /**
   * Format the categories IDs array into the prisma query way
   */
  private connectCategoriesById(
    category: Array<string | null>
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
