import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './models/customer.model';

@Injectable()
export class CustomersRepository extends BaseRepository(Customer, Customer, 'customer') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getCustomers({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string) {
    return this.getCustomerById(id);
  }

  create(data: CreateCustomerInput) {
    return this.createCustomer({ data });
  }

  update(id: string, data: UpdateCustomerInput) {
    return this.updateCustomer({ data, where: { id } });
  }

  remove(id: string) {
    return this.deleteCustomer({ where: { id } });
  }

  createCustomer(params: { data: CreateCustomerInput }) {
    const { data } = params;
    return this.model.create({ data });
  }

  getCustomer(params: { where: Prisma.CustomerWhereInput }) {
    const { where } = params;
    return this.prisma.customer.findFirst({ where });
  }

  getCustomerById(id: string) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  getCustomers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  updateCustomer(params: { where: Prisma.CustomerWhereUniqueInput; data: UpdateCustomerInput }) {
    const { where, data } = params;

    return this.prisma.customer.update({
      where,
      data: {
        ...data,
      },
    });
  }

  deleteCustomer(params: { where: Prisma.CustomerWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.customer.delete({ where });
  }
}
