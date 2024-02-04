import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserWithKeys } from './models/user.model';

const userInclude = Prisma.validator<Prisma.UserInclude>()({
  customer: true,
});

@Injectable()
export class UsersRepository extends BaseRepository(User, UserWithKeys, 'user') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getUsers({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string) {
    return this.getUserById(id);
  }

  create(data: CreateUserInput) {
    return this.createUser({ data });
  }

  update(id: string, data: UpdateUserInput) {
    return this.updateUser({ data, where: { id } });
  }

  remove(id: string) {
    return this.deleteUser({ where: { id } });
  }

  createUser(params: { data: CreateUserInput }): Promise<User | null> {
    const {
      data: { customerId, ...user },
    } = params;

    return this.prisma.user.create({
      data: {
        customer: this.connectCustomerById(customerId),
        ...user,
      },
      include: userInclude,
    });
  }

  async getUser(params: { where: Prisma.UserWhereInput }) {
    const { where } = params;
    return await this.prisma.user.findFirst({ where, include: userInclude });
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id }, include: userInclude });
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
      include: userInclude,
      orderBy,
    });
  }

  updateUser(params: { where: Prisma.UserWhereUniqueInput; data: UpdateUserInput }): Promise<User | null> {
    const { where, data } = params;

    return this.prisma.user.update({ where, data, include: userInclude });
  }

  deleteUser(params: { where: Prisma.UserWhereUniqueInput }): Promise<User | null> {
    const { where } = params;
    return this.prisma.user.delete({ where, include: userInclude });
  }

  private connectCustomerById(id: string): Prisma.CustomerCreateNestedOneWithoutUserInput {
    return {
      connect: { id },
    };
  }
}
