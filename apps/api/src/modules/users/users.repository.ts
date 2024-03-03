import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { EntityOptions } from '../common/base.types';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';
import { User, UserWithKeys } from './models/user.model';

const userInclude = Prisma.validator<Prisma.UserInclude>()({
  customer: true,
});

@Injectable()
export class UsersRepository extends BaseRepository(User, UserWithKeys, 'user') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
    options?: EntityOptions
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getUsers(
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
    return this.getUserById(id, options);
  }

  create(data: CreateUserInput) {
    return this.createUser({ data });
  }

  update(id: string, data: UpdateUserInput) {
    return this.updateUser({ data, where: { id } });
  }

  remove(id: string, softDelete = true) {
    return softDelete ? this.softDeleteUser({ where: { id } }) : this.deleteUser({ where: { id } });
  }

  createUser(params: { data: CreateUserInput }) {
    const {
      data: { customerId, ...user },
    } = params;

    return this.model.create({
      data: {
        customerId,
        ...user,
      },
      include: userInclude,
    });
  }

  getUser(params: { where: Prisma.UserWhereInput }, options: EntityOptions = {}) {
    const { where } = params;

    return this.model.findFirst({
      where: {
        ...where,
        ...super.getWhereExtraOptions(options),
      },
      include: userInclude,
    });
  }

  getUserById(id: string, options: EntityOptions = {}) {
    return this.model.findUnique({
      where: { id, ...super.getWhereExtraOptions(options) },
      include: userInclude,
    });
  }

  getUsers(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
    options: EntityOptions = {}
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.model.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        ...super.getWhereExtraOptions(options),
      },
      include: userInclude,
      orderBy,
    });
  }

  updateUser(params: { where: Prisma.UserWhereUniqueInput; data: UpdateUserInput }) {
    const { where, data } = params;

    return this.model.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data,
      include: userInclude,
    });
  }

  updatePasswordHash(id: string, passwordHash: string) {
    return this.model.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        passwordHash,
      },
      include: userInclude,
    });
  }

  softDeleteUser(params: { where: Prisma.UserWhereUniqueInput }) {
    const { where } = params;

    return this.model.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
      include: userInclude,
    });
  }

  deleteUser(params: { where: Prisma.UserWhereUniqueInput }) {
    const { where } = params;

    return this.model.delete({ where, include: userInclude });
  }
}
