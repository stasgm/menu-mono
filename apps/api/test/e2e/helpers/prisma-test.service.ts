import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AppConfig } from '@/core/config/app-config';

@Injectable()
export class PrismaTestService extends PrismaClient implements OnModuleInit {
  constructor(readonly appConfig: AppConfig) {
    if (appConfig.envPrefix !== 'test') {
      throw new Error('Enviroment must be only "test"');
    }

    const url = appConfig.postgresUrl;

    if (!url) {
      throw new Error('Postgres url is not set');
    }

    super({
      datasources: {
        db: {
          url,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.log(error);
    }
  }

  async resetDB(): Promise<void> {
    await this.$transaction([
      this.orderLine.deleteMany(),
      this.order.deleteMany(),
      this.menuLine.deleteMany(),
      this.menu.deleteMany(),
      this.product.deleteMany(),
      this.category.deleteMany(),
      this.activationCode.deleteMany(),
      this.user.deleteMany(),
      this.customer.deleteMany(),
    ]);
  }
}
