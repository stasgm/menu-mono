import { Logger } from '@nestjs/common';

import { FindAllBaseArgs } from './base.dto';
import { BaseEntity } from './base.entity';
import { BaseRepository, PrismaModel } from './base.repository';

export type CreateInput<T extends BaseEntity> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type UpdateInput<T extends BaseEntity> = Partial<CreateInput<T>>;

export interface IBaseRepository<T extends BaseEntity> {
  readonly model: any;
  findAll: (params: FindAllBaseArgs) => Promise<T[]>;
  findOne: (id: string) => Promise<T | null>;
  create: (createInput: CreateInput<T>) => Promise<T | null>;
  update: (id: string, updateInput: UpdateInput<T>) => Promise<T | null>;
  remove: (id: string) => Promise<T | null>;
}

export interface IBaseResolver<T extends BaseEntity> {
  readonly service: IBaseService<T>;
  findAll: (params: FindAllBaseArgs) => Promise<T[]>;
  findOne: (id: string) => Promise<T | null>;
  create: (createInput: CreateInput<T>) => Promise<T | null>;
  update: (id: string, updateInput: UpdateInput<T>) => Promise<T | null>;
  remove: (id: string) => Promise<T | null>;
}

export interface IBaseService<T extends BaseEntity> {
  readonly repository: IBaseRepository<T>;
  readonly logger: Logger;
  findAll: (params: FindAllBaseArgs) => Promise<T[]>;
  findOne: (id: string) => Promise<T | null>;
  create: (createInput: CreateInput<T>) => Promise<T | null>;
  update: (id: string, updateInput: UpdateInput<T>) => Promise<T | null>;
  remove: (id: string) => Promise<T | null>;
}
