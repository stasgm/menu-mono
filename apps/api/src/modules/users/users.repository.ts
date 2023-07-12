import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { CreateUserInput, UpdateUserInput } from '../../types/graphql.schema';
import { PrismaService } from '../_core/persistence/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(params: { data: CreateUserInput }): Promise<User> {
    const { data } = params;

    return this.prisma.user.create({
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.getUser({ where: { phoneNumber } });
  }

  getUser(params: { where: Prisma.UserWhereInput }) {
    const { where } = params;
    return this.prisma.user.findFirst({ where });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUsers(params: {
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

  async updateUser(params: {
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

  async deleteUser(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { where } = params;
    return this.prisma.user.delete({ where });
  }
}
