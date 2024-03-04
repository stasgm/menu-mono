import { Logger } from '@nestjs/common';

import { FindAllBaseArgs } from './base.dto';
import { BaseEntity } from './base.entity';

export type EntityOptions = {
  includeDeleted?: boolean;
};

export type CreateInput<T extends BaseEntity> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type UpdateInput<T extends BaseEntity> = Partial<CreateInput<T>>;

export interface IBaseRepository<T extends BaseEntity, C extends BaseEntity> {
  readonly model: any;
  findAll: (params: FindAllBaseArgs, options?: EntityOptions) => Promise<T[]>;
  findOne: (id: string, options?: EntityOptions) => Promise<T | null>;
  create: (createInput: CreateInput<C>) => Promise<T>;
  update: (id: string, updateInput: UpdateInput<C>) => Promise<T | null>;
  remove: (id: string) => Promise<T | null>;
}

export interface IBaseResolver<T extends BaseEntity, C extends BaseEntity> {
  readonly service: IBaseService<T, C>;
  findAll: (params: FindAllBaseArgs, options?: EntityOptions) => Promise<T[]>;
  findOne: (id: string, options?: EntityOptions) => Promise<T | null>;
  create: (createInput: CreateInput<C>) => Promise<T>;
  update: (id: string, updateInput: UpdateInput<C>) => Promise<T | null>;
  remove: (id: string) => Promise<T | null>;
}

export interface IBaseService<T extends BaseEntity, C extends BaseEntity> {
  readonly repository: IBaseRepository<T, C>;
  readonly logger: Logger;
  findAll: (params: FindAllBaseArgs, options?: EntityOptions) => Promise<T[]>;
  findOne: (id: string, options?: EntityOptions) => Promise<T | null>;
  create: (createInput: CreateInput<C>) => Promise<T>;
  update: (id: string, updateInput: UpdateInput<C>) => Promise<T | null>;
  remove: (id: string) => Promise<T | null>;
}
