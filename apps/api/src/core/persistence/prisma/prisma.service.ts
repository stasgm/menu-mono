import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { AppConfig } from '@/core/config/app-config';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'beforeExit'> implements OnModuleInit {
  constructor(readonly appConfig: AppConfig) {
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

  categorySoftDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    // if (params.model !== 'Category') {
    //   return next(params);
    // }
    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deletedAt: new Date(),
          },
        },
      });
    }
    return next(params);
  };

  async onModuleInit() {
    await this.$connect();
    this.$use(this.categorySoftDeleteMiddleware);
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
