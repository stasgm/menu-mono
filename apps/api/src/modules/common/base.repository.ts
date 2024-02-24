import { Type } from '@nestjs/common';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { PrismaModel } from '@/core/persistence/prisma/prisma.types';

import { FindAllBaseArgs } from './base.dto';
import { BaseEntity } from './base.entity';
import { CreateInput, EntityOptions, IBaseRepository, UpdateInput } from './base.types';

export const BaseRepository = <Model extends PrismaModel, T extends BaseEntity, C extends BaseEntity = T>(
  _entity: Type<T>,
  _entityWithKeys: Type<C>,
  _model: Model
) => {
  abstract class BaseRepositoryHost implements IBaseRepository<T, C> {
    readonly model;
    constructor(readonly prisma: PrismaService) {
      const mod = prisma[_model];

      if (!mod) {
        throw new Error(`Entity  not found`);
      }

      this.model = mod;
    }

    abstract findAll(params: FindAllBaseArgs): Promise<T[]>;
    abstract findOne(id: string, options?: EntityOptions): Promise<T | null>;
    abstract create(createInput: CreateInput<C>): Promise<T>;
    abstract update(id: string, updateInput: UpdateInput<C>): Promise<T | null>;
    abstract remove(id: string): Promise<T | null>;
  }
  return BaseRepositoryHost;
};
