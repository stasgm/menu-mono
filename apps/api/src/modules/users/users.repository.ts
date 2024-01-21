import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { PasswordService } from '../auth/password.service';
import { Roles } from '../auth/types';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService, private passwordService: PasswordService) {}

  async createUser(params: { data: CreateUserInput }): Promise<User> {
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

  async getUser(params: { where: Prisma.UserWhereInput }) {
    const { where } = params;

    return await this.prisma.user.findFirst({
      where,
      // select: {
      //   id: true,
      //   name: true,
      //   active: true,
      //   confirmed: true,
      //   customer: true,
      //   role: true,
      //   createdAt: true,
      //   updatedAt: true,
      // },
    });
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        active: true,
        confirmed: true,
        customer: true,
        role: true,
        createdAt: true,
        updatedAt: true,
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
      data,
    });
  }

  deleteUser(params: { where: Prisma.UserWhereUniqueInput }): Promise<User | null> {
    const { where } = params;

    return this.prisma.user.delete({ where });
  }
}
