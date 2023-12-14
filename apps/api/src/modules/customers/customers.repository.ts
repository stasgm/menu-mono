import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { CreateCustomerInput, UpdateCustomerInput } from '../../types/graphql.schema';

@Injectable()
export class CustomersRepository {
  constructor(private prisma: PrismaService) {}

  createCustomer(params: { data: CreateCustomerInput }): Promise<Customer> {
    const { data } = params;

    return this.prisma.customer.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  getCustomer(params: { where: Prisma.CustomerWhereInput }) {
    const { where } = params;
    return this.prisma.customer.findFirst({ where });
  }

  getCustomerById(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  getCustomers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  updateCustomer(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: UpdateCustomerInput;
  }): Promise<Customer | null> {
    const { where, data } = params;

    return this.prisma.customer.update({
      where,
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  deleteCustomer(params: { where: Prisma.CustomerWhereUniqueInput }): Promise<Customer> {
    const { where } = params;
    return this.prisma.customer.delete({ where });
  }
}
