import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { CreateActivationCodeInput } from './dto/create-activation-code.input';
import { UpdateActivationWithoutCodeCodeInput } from './dto/update-activation-code.input';
import { generateRandomNumber } from './helpers';
import { ActivationCode, ActivationCodeWithKeys } from './models/activation-code.model';

const activationCodeInclude = Prisma.validator<Prisma.ActivationCodeInclude>()({
  user: {
    include: {
      customer: true,
    },
  },
});

const NUMBER_OF_DIGITS = 5;
const MAX_NUMBER_OF_ATTEMPTS = 3;

@Injectable()
export class ActivationCodesRepository extends BaseRepository(
  ActivationCode,
  ActivationCodeWithKeys,
  'activationCode'
) {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivationCodeWhereUniqueInput;
    where?: Prisma.ActivationCodeWhereInput;
    orderBy?: Prisma.ActivationCodeOrderByWithRelationInput;
  }): Promise<ActivationCode[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getActivationCodes({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string) {
    return this.getActivationCodeById(id);
  }

  create(data: CreateActivationCodeInput) {
    return this.createActivationCode({ data });
  }

  update(id: string, data: UpdateActivationWithoutCodeCodeInput) {
    return this.updateActivationCode({ data, where: { id } });
  }

  refreshCode(id: string) {
    const code = generateRandomNumber(NUMBER_OF_DIGITS).toString();
    return this.model.update({ data: { code }, where: { id }, include: activationCodeInclude });
  }

  remove(id: string) {
    return this.deleteActivationCode({ where: { id } });
  }

  createActivationCode(params: { data: CreateActivationCodeInput }): Promise<ActivationCode | null> {
    const {
      data: { userId, ...activationCode },
    } = params;

    return this.model.create({
      data: {
        user: this.connectUserById(userId),
        attempts: 0,
        code: generateRandomNumber(NUMBER_OF_DIGITS).toString(),
        ...activationCode,
      },
      include: activationCodeInclude,
    });
  }

  getActivationCode(params: { where: Prisma.ActivationCodeWhereInput }) {
    const { where } = params;

    return this.model.findFirst({ where, include: activationCodeInclude });
  }

  getActivationCodeById(id: string) {
    return this.model.findUnique({ where: { id }, include: activationCodeInclude });
  }

  getActivationCodes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivationCodeWhereUniqueInput;
    where?: Prisma.ActivationCodeWhereInput;
    orderBy?: Prisma.ActivationCodeOrderByWithRelationInput;
  }): Promise<ActivationCode[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      include: activationCodeInclude,
      orderBy,
    });
  }

  updateActivationCode(params: {
    where: Prisma.ActivationCodeWhereUniqueInput;
    data: UpdateActivationWithoutCodeCodeInput;
  }): Promise<ActivationCode | null> {
    const { where, data } = params;

    return this.model.update({ where, data, include: activationCodeInclude });
  }

  deleteActivationCode(params: { where: Prisma.ActivationCodeWhereUniqueInput }): Promise<ActivationCode | null> {
    const { where } = params;
    return this.model.delete({ where, include: activationCodeInclude });
  }

  private connectUserById(id: string): Prisma.UserCreateNestedOneWithoutActivationCodeInput {
    return {
      connect: { id },
    };
  }
}
