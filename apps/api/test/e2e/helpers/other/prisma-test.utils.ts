import { PrismaModel } from '@/core/persistence/prisma/prisma.types';

import { PrismaTestService } from '../prisma-test.service';

export class PrismaTestUtils {
  // private connection: Connection;
  constructor(private readonly prisma: PrismaTestService) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('NODE_ENV !== test');
    }
  }

  // addOne<Model extends PrismaModel, T>(_model: Model, data: T): Promise<T> {
  //   try {
  //     const model = this.prisma[_model];
  //     return model.create(data);
  //   } catch (error) {
  //     throw new Error(`Error adding entity: ${_model.toString()}${error}`);
  //   }
  // }

  // addMany = async <T>(entities: T[]): Promise<T[]> => {
  //   const savedEntities: T[] = [];
  //   for (const entity of entities) {
  //     try {
  //       const name = (entity as unknown as Type<T>).constructor.name;
  //       // const repository = this.connection.getRepository(name);
  //       // const created = repository.create({ ...entity }) as T;
  //       // const savedEntity = await repository.save(created);
  //       // savedEntities.push(savedEntity);
  //       return Promise.resolve(entities);
  //     } catch (e) {
  //       throw new Error(`Error adding entity: ${_model.toString()}. ${e}`);
  //     }
  //   }
  //   return savedEntities;
  // };
}
