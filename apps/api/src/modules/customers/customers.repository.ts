import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { EntityOptions } from '../common/base.types';
import { CreateCustomerInput, UpdateCustomerInput } from './dto/inputs';
import { Customer } from './models/customer.model';

@Injectable()
export class CustomersRepository extends BaseRepository(Customer, Customer, 'customer') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CustomerWhereUniqueInput;
      where?: Prisma.CustomerWhereInput;
      orderBy?: Prisma.CustomerOrderByWithRelationInput;
    },
    options?: EntityOptions
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getCustomers(
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

  findOne(id: string, options?: EntityOptions) {
    return this.getCustomerById(id, options);
  }

  create(data: CreateCustomerInput) {
    return this.createCustomer({ data });
  }

  update(id: string, data: UpdateCustomerInput) {
    return this.updateCustomer({ data, where: { id } });
  }

  remove(id: string, softDelete = true) {
    return softDelete ? this.softDeleteCustomer({ where: { id } }) : this.deleteCustomer({ where: { id } });
  }

  createCustomer(params: { data: CreateCustomerInput }) {
    const { data } = params;

    return this.model.create({ data });
  }

  getCustomer(params: { where: Prisma.CustomerWhereInput }, options: EntityOptions = {}) {
    const { where } = params;
    return this.prisma.customer.findFirst({
      where: {
        ...where,
        ...super.getWhereExtraOptions(options),
      },
    });
  }

  getCustomerById(id: string, options: EntityOptions = {}) {
    return this.prisma.customer.findUnique({
      where: {
        id,
        ...super.getWhereExtraOptions(options),
      },
    });
  }

  getCustomers(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CustomerWhereUniqueInput;
      where?: Prisma.CustomerWhereInput;
      orderBy?: Prisma.CustomerOrderByWithRelationInput;
    },
    options: EntityOptions = {}
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        ...super.getWhereExtraOptions(options),
      },
      orderBy,
    });
  }

  updateCustomer(params: { where: Prisma.CustomerWhereUniqueInput; data: UpdateCustomerInput }) {
    const { where, data } = params;

    return this.prisma.customer.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data,
    });
  }

  softDeleteCustomer(params: { where: Prisma.CustomerWhereUniqueInput }) {
    const { where } = params;

    return this.model.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  deleteCustomer(params: { where: Prisma.CustomerWhereUniqueInput }) {
    const { where } = params;

    return this.prisma.customer.delete({ where });
  }
}
