import { BaseEntity } from './base.entity';

export type Constructor<T = any> = new (...args: any[]) => T;

export type CreateInput<T extends BaseEntity> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
export type UpdateInput<T extends BaseEntity> = Partial<CreateInput<T>>;

export interface IBaseRepository<T extends BaseEntity> {
  findAll: (params: { skip?: number; take?: number }) => Promise<T[]>;
  findOne: (id: string) => Promise<T | null>;
  create: (createInput: CreateInput<T>) => Promise<T | null>;
  update: (id: string, updateInput: UpdateInput<T>) => Promise<T | null>;
  remove: (id: string) => Promise<T | null>;
  // removeMany: (ids: number[]) => Promise<boolean>;
}
