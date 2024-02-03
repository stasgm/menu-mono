import { Type } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';

import { FindAllBaseArgs } from './base.dto';
import { BaseEntity } from './base.entity';
import { CreateInput, IBaseRepository, UpdateInput } from './base.types';

export type PrismaModel = keyof Omit<
  PrismaClient,
  | '$extends'
  | '$connect'
  | '$disconnect'
  | '$executeRaw'
  | '$executeRawUnsafe'
  | '$on'
  | '$queryRaw'
  | '$queryRawUnsafe'
  | '$transaction'
  | '$use'
>;

// type ModelType = Prisma.TypeMap['model'];

// type ModelNames = Prisma.ModelName; // "User" | "Post"

// export type PrismaModels = {
//   [M in ModelNames]: Exclude<Awaited<ReturnType<PrismaClient[Uncapitalize<M>]['findUnique']>>, null>;
// };

export const BaseRepository = <T extends BaseEntity, Model extends PrismaModel>(_entity: Type<T>, _model: Model) => {
  abstract class BaseRepositoryHost implements IBaseRepository<T> {
    readonly model;
    constructor(readonly prisma: PrismaService) {
      const mod = prisma[_model];

      if (!mod) {
        throw new Error(`Entity  not found`);
      }

      this.model = mod;
    }

    abstract findAll(params: FindAllBaseArgs): Promise<T[]>;
    abstract findOne(id: string): Promise<T | null>;
    abstract create(createInput: CreateInput<T>): Promise<T | null>;
    abstract update(id: string, updateInput: UpdateInput<T>): Promise<T | null>;
    abstract remove(id: string): Promise<T | null>;
  }
  return BaseRepositoryHost;
};
