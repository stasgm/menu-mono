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
