import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { CreateCustomerInput, CreateUserInput, UpdateUserInput } from '../../types/graphql.schema';
import { PasswordService } from '../auth/password.service';
import { Roles } from '../auth/types';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService, private passwordService: PasswordService) {}

  async createUser(params: { data: CreateUserInput & CreateCustomerInput }): Promise<User> {
    const { data } = params;

    // DEFAULT VALUES:
    // - active: false
    // - rule: user
    const passwordHash = await this.passwordService.hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        name: data.name,
        passwordHash,
        role: Roles.USER,
        active: false,
        customer: {
          create: {
            phoneNumber: data.phoneNumber,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
        // customerId: data.customerId,
      },
    });
  }

  getUser(params: { where: Prisma.UserWhereInput }) {
    // TODO do not return passwordHash
    const { where } = params;
    return this.prisma.user.findFirst({
      where,
    });
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        passwordHash: false,
      },
    });
  }

  getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      select: {
        passwordHash: false,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserInput;
  }): Promise<User | null> {
    const { where, data } = params;

    return this.prisma.user.update({
      where,
      data: {
        name: data.name,
      },
    });
  }

  deleteUser(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params;
    return this.prisma.user.delete({ where });
  }
}
