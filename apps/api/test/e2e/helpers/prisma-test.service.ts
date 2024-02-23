import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { AppConfig } from '@/core/config/app-config';

@Injectable()
export class PrismaTestService extends PrismaClient<Prisma.PrismaClientOptions, 'beforeExit'> implements OnModuleInit {
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
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
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
