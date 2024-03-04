import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { EntityOptions } from '../common/base.types';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { Product, ProductWithKeys } from './models/product.model';

const productInclude = Prisma.validator<Prisma.ProductInclude>()({
  categories: true,
});

type ExtraEntityOptions = EntityOptions & { includeDisabled?: boolean };

const getWhereEntityExtraOptions = (options: ExtraEntityOptions) => {
  const { includeDisabled = false } = options || {};

  const disabledOption = includeDisabled ? undefined : { disabled: false };

  return { ...disabledOption };
};

@Injectable()
export class ProductsRepository extends BaseRepository(Product, ProductWithKeys, 'product') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProductWhereUniqueInput;
      where?: Prisma.ProductWhereInput;
      orderBy?: Prisma.ProductOrderByWithRelationInput;
    },
    options?: ExtraEntityOptions
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getProducts(
      {
        skip,
        take,
        cursor,
        where,
        orderBy,
      },
      options
    );
  }

  findOne(id: string, options?: ExtraEntityOptions) {
    return this.getProductById(id, options);
  }

  create(data: CreateProductInput) {
    return this.createProduct({ data });
  }

  update(id: string, data: UpdateProductInput, options?: ExtraEntityOptions) {
    return this.updateProduct({ data, where: { id } }, options);
  }

  remove(id: string, softDelete = true) {
    return softDelete ? this.softDeleteProduct({ where: { id } }) : this.deleteProduct({ where: { id } });
  }

  private async createProduct(params: { data: CreateProductInput }) {
    const {
      data: { categories, ...rest },
    } = params;

    return this.model.create({
      data: {
        ...rest,
        categories: this.connectCategoriesById(categories),
      },
      include: productInclude,
    });
  }

  private getProductById(id: string, options: ExtraEntityOptions = {}) {
    return this.model.findUnique({
      where: {
        id,
        ...super.getWhereExtraOptions(options),
        ...getWhereEntityExtraOptions(options),
      },
      include: productInclude,
    });
  }

  private async getProducts(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProductWhereUniqueInput;
      where?: Prisma.ProductWhereInput;
      orderBy?: Prisma.ProductOrderByWithRelationInput;
    },
    options: ExtraEntityOptions = {}
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.model.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        ...super.getWhereExtraOptions(options),
        ...getWhereEntityExtraOptions(options),
      },
      include: productInclude,
      orderBy,
    });
  }

  private async updateProduct(
    params: { where: Prisma.ProductWhereUniqueInput; data: UpdateProductInput },
    options: ExtraEntityOptions = {}
  ) {
    const {
      where,
      data: { categories, ...rest },
    } = params;

    const updateData = {
      ...rest,
      categories: categories ? this.connectCategoriesById(categories) : undefined,
    };

    return this.model.update({
      where: {
        ...where,
        ...super.getWhereExtraOptions(options),
        ...getWhereEntityExtraOptions(options),
      },
      data: updateData,
      include: productInclude,
    });
  }

  private async softDeleteProduct(params: { where: Prisma.ProductWhereUniqueInput }) {
    const { where } = params;

    return this.model.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
      include: productInclude,
    });
  }

  private async deleteProduct(params: { where: Prisma.ProductWhereUniqueInput }) {
    const { where } = params;

    return this.model.delete({ where, include: productInclude });
  }

  /**
   * Format the categories IDs array into the prisma query way
   */
  private connectCategoriesById(
    categoryIds: Array<string | null>
  ): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput {
    const categories = categoryIds.reduce((acc, cur) => {
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
