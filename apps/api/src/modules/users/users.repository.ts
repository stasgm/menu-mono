import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { PasswordService } from '@/modules/auth/password.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';

@Injectable()
export class UsersRepository extends BaseRepository(User, 'user') {
  constructor(readonly prisma: PrismaService, private readonly passwordService: PasswordService) {
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
    // const user: UserModel = {
    //     ...data,
    //   id: 'id',
    //   createdAt: new Date(),
    //   deletedAt: null,
    //   updatedAt: new Date(),
    //   customer: {
    //     createdAt: new Date(),
    //     deletedAt: null,
    //     updatedAt: new Date(),
    //     email: 'email',
    //     firstName: 'firstName',
    //     id: 'id',
    //     lastName: 'lastName',
    //     phoneNumber: 'phoneNumber',
    //   }
    // };
    return Promise.resolve(null);
    // return this.createUser({ data });
  }

  update(id: string, data: UpdateUserInput) {
    return Promise.resolve(null);
    // return this.updateUser({ data, where: { id } });
  }

  remove(id: string) {
    return this.deleteUser({ where: { id } });
  }

  createUser(params: { data: CreateUserInput }): Promise<User | null> {
    const { data } = params;
    return Promise.resolve(null);
    // return this.prisma.user.create({ data });
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

  updateUser(params: { where: Prisma.UserWhereUniqueInput; data: UpdateUserInput }): Promise<User | null> {
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
