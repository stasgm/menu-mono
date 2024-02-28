import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { PasswordService } from '@/modules/auth/password.service';

import { CreateUserData, getUserData, userPassword } from '../mock-data';

@Injectable()
export class PrismaUtilsService {
  constructor(
    readonly prismaService: PrismaService,
    readonly passwordService: PasswordService
  ) {}

  async createUser(
    createUserData: Omit<CreateUserData, 'passwordHash'> & { password?: string } = {},
    activationCode?: string
  ) {
    const { password = userPassword, ...userData } = createUserData;
    const passwordHash = await this.passwordService.hashPassword(password);

    const user = await this.prismaService.user.create({ data: getUserData({ passwordHash, ...userData }) });

    if (activationCode) {
      // 2. Create an activation code
      await this.prismaService.activationCode.create({
        data: {
          code: activationCode,
          userId: user.id,
        },
      });
    }

    return user;
  }

  async updateUser(
    userId: string,
    userData: Partial<Omit<CreateUserData, 'passwordHash'>> & { deletedAt?: Date } = {}
  ) {
    return this.prismaService.user.update({ data: userData, where: { id: userId } });
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

  async resetDB(): Promise<void> {
    // const models = Prisma.dmmf.datamodel.models;
    // return Promise.all(models.map((model) => (this.prismaService[model.name] as any).deleteMany()));
    await this.prismaService.$transaction([
      this.prismaService.orderLine.deleteMany(),
      this.prismaService.order.deleteMany(),
      this.prismaService.menuLine.deleteMany(),
      this.prismaService.menu.deleteMany(),
      this.prismaService.product.deleteMany(),
      this.prismaService.category.deleteMany(),
      this.prismaService.activationCode.deleteMany(),
      this.prismaService.user.deleteMany(),
      this.prismaService.customer.deleteMany(),
    ]);
  }
}

export {};
