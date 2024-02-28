import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AppConfig } from '@/core/config/app-config';

export type Datasource = {
  url?: string;
};

export type Datasources = {
  db?: Datasource;
};

export interface PrismaClientOptions {
  datasources?: Datasources;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    readonly prismaClientOptions: PrismaClientOptions,
    readonly appConfig: AppConfig
  ) {
    const url = appConfig.postgresUrl;

    if (!prismaClientOptions?.datasources?.db?.url && !url) {
      throw new Error('Postgres url is not set');
    }

    super({
      datasources: prismaClientOptions.datasources ?? {
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
}
