import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BaseRepository } from '@/modules/common/base.repository';

import { CreateTokenInput } from './dto/inputs/create-token.input';
import { UpdateTokenWithoutTokenInput } from './dto/inputs/update-token.input';
import { Token, TokenWithKeys } from './models/token.model';

const tokenInclude = Prisma.validator<Prisma.TokenInclude>()({
  user: {
    include: {
      customer: true,
    },
  },
});

@Injectable()
export class TokensRepository extends BaseRepository(Token, TokenWithKeys, 'token') {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TokenWhereUniqueInput;
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithRelationInput;
  }): Promise<Token[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.getTokens({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string) {
    return this.getTokenById(id);
  }

  create(data: CreateTokenInput) {
    return this.createToken({ data });
  }

  update(id: string, data: UpdateTokenWithoutTokenInput) {
    return this.updateToken({ data, where: { id } });
  }

  remove(id: string) {
    return this.deleteToken({ where: { id } });
  }

  createToken(params: { data: CreateTokenInput }) {
    const {
      data: { userId, ...tokenData },
    } = params;

    // let resetToken = crypto.randomBytes(32).toString("hex");
    // const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    const hash = 'temporary-hash';

    return this.model.create({
      data: {
        userId,
        token: hash,
        ...tokenData,
      },
      include: tokenInclude,
    });
  }

  getToken(params: { where: Prisma.TokenWhereInput }) {
    const { where } = params;

    return this.model.findFirst({ where, include: tokenInclude });
  }

  getTokenById(id: string) {
    return this.model.findUnique({ where: { id }, include: tokenInclude });
  }

  getTokens(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TokenWhereUniqueInput;
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithRelationInput;
  }): Promise<Token[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.model.findMany({
      skip,
      take,
      cursor,
      where,
      include: tokenInclude,
      orderBy,
    });
  }

  updateToken(params: {
    where: Prisma.TokenWhereUniqueInput;
    data: UpdateTokenWithoutTokenInput;
  }): Promise<Token | null> {
    const { where, data } = params;

    return this.model.update({ where, data, include: tokenInclude });
  }

  deleteToken(params: { where: Prisma.TokenWhereUniqueInput }): Promise<Token | null> {
    const { where } = params;

    return this.model.delete({ where, include: tokenInclude });
  }
}
