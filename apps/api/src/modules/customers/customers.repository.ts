import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

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

  getCustomer(params: { where: Prisma.CustomerWhereInput }): Promise<Customer | null> {
    const { where } = params;
    return this.prisma.customer.findFirst({ where });
  }

  getCustomerById(id: string): Promise<Customer | null> {
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
    const { skip = 0, take = 100, cursor, where, orderBy } = params;
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
        ...data,
      },
    });
  }

  deleteCustomer(params: { where: Prisma.CustomerWhereUniqueInput }): Promise<Customer | null> {
    const { where } = params;
    return this.prisma.customer.delete({ where });
  }
}
