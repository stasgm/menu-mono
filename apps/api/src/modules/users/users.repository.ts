import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../core/persistence/prisma/prisma.service';
import { CreateUserInput, UpdateUserInput } from '../../types/graphql.schema';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  createUser(params: { data: CreateUserInput }): Promise<User> {
    const { data } = params;

    return this.prisma.user.create({
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  getUser(params: { where: Prisma.UserWhereInput }) {
    const { where } = params;
    return this.prisma.user.findFirst({ where });
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
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
        phoneNumber: data.phoneNumber,
      },
    });
  }

  deleteUser(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params;
    return this.prisma.user.delete({ where });
  }
}
