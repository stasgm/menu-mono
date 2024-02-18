import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { AppConfigModule } from '@/core/config/app-config.module';

import { AppModule } from '../../src/app.module';
import { GraphqlConfigService } from '../../src/core/graphql/graphql-config';
import { GraphqlTestConfigService } from './graphql.config';
import { PrismaTestService } from './prisma.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

export interface E2EApp {
  app: INestApplication;
  prisma: PrismaTestService;

  cleanup(): Promise<void>;
}

export async function initializeApp() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
      AppConfigModule,
      // GraphQLModule.forRootAsync({
      //   driver: ApolloDriver,
      //   useClass: GraphqlTestConfigService,
      //   imports: [AppConfigModule],
      // }),
    ],
    providers: [PrismaTestService],
  })
    // .overrideProvider(GraphqlConfigService)
    // .useClass(GraphqlTestConfigService)
    .overrideProvider(PrismaService)
    .useClass(PrismaTestService)
    // .useMocker(() => {
    //   return {};
    // })
    .compile();

  const prisma = moduleRef.get(PrismaTestService);

  const app = moduleRef.createNestApplication();
  await app.init();

  const cleanup = async () => {
    await prisma.resetDB();
    // await app.close();
  };

  return { app, prisma, cleanup };
}
