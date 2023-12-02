import { Injectable } from '@nestjs/common';
import { usersMock } from '@packages/mocks';

import { PrismaService } from '../../prisma.service';
import { logInfo } from '../helpers';
import { ISeedService } from '../types';

@Injectable()
export class UsersSeedService implements ISeedService {
  public readonly name = 'users';

  constructor(private prisma: PrismaService) {}

  async removeAll() {
    logInfo(this.name, 'REMOVE');

    await this.prisma.user.deleteMany();
  }

  async seed() {
    logInfo(this.name);

    for await (const user of usersMock) {
      await this.prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber,
        },
      });
    }
  }
}
