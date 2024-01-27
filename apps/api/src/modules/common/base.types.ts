// import { Service } from './base.service';

export type Constructor<T = any> = new (...args: any[]) => T;

export interface IBaseRepository<T> {
  // create: (createInput: DeepPartial<T>) => Promise<T | boolean>;
  findAll: (parasm: { skip?: number; take?: number }) => Promise<T[]>;
  // findOne: (id: number) => Promise<T | null>;
  // update: (updateInput: IUpdateInput<T>) => Promise<T | boolean>;
  // remove: (id: number) => Promise<boolean>;
  // removeMany: (ids: number[]) => Promise<boolean>;
}

// export type AbstractConstructor<T> = abstract new (...args: any[]) => T;

// export abstract class BaseResolver<T> {
//   abstract readonly service: Service<T>;
// }
