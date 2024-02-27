import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { AppConfig } from '@/core/config/app-config';

import { softDelete } from './prisma.extensions';

//function to give us a prismaClient with extensions we want
export const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(softDelete); //here we add our created extensions
};

//Our Custom Prisma Client with the client set to the customPrismaClient with extension
export class PrismaClientExtended extends PrismaClient<Prisma.PrismaClientOptions, 'beforeExit'> {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.customPrismaClient) this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient;
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

//Create a type to our funtion
export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;

@Injectable()
export class PrismaService extends PrismaClientExtended implements OnModuleInit {
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

  async onModuleInit() {
    await this.$connect();
    this.$extends(softDelete);
  }
}
