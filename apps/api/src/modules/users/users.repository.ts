import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { EntityOptions } from '../common/base.types';
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

  findOne(id: string, options?: EntityOptions) {
    return this.getUserById(id, options);
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

  createUser(params: { data: CreateUserInput }) {
    const {
      data: { customerId, ...user },
    } = params;

    return this.model.create({
      data: {
        customerId,
        // customer: this.connectCustomerById(customerId),
        ...user,
      },
      include: userInclude,
    });
  }

  getUser(params: { where: Prisma.UserWhereInput }) {
    const { where } = params;

    return this.model.findFirst({ where, include: userInclude });
  }

  getUserById(id: string, options: EntityOptions = {}) {
    const { includeDeleted = false, includeDisabled = false } = options || {};

    const deletedAtCond = includeDeleted ? undefined : { deletedAt: null };

    return this.model.findUnique({
      where: { id, ...deletedAtCond, disabled: includeDisabled },
      include: userInclude,
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

    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      include: userInclude,
      orderBy,
    });
  }

  updateUser(params: { where: Prisma.UserWhereUniqueInput; data: UpdateUserInput }) {
    const { where, data } = params;

    return this.model.update({ where, data, include: userInclude });
  }

  deleteUser(params: { where: Prisma.UserWhereUniqueInput }) {
    const { where } = params;

    return this.model.delete({ where, include: userInclude });
  }

  // private connectCustomerById(id: string): Prisma.CustomerCreateNestedOneWithoutUserInput {
  //   return {
  //     connect: { id },
  //   };
  // }
}
