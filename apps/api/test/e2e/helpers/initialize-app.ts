import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PersistenceModule } from '@/core/persistence/persistence.module';
import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';
import { SchedulersModule } from '@/core/schedulers/shcedulers.module';

// import { PasswordService } from '@/modules/auth/password.service';
import { AppModule } from '../../../src/app.module';
import { PersistenceTestModule } from './test-modules/persistence-test.module';
import { PrismaTestService } from './test-modules/prisma-test.service';
import { PrismaUtilsService } from './test-modules/prisma-test-utils.service';
import { BullmqTestProducerService, SchedulersTestModule } from './test-modules/schedulers-test.module';

export interface E2EApp {
  app: INestApplication;
  prismaUtilsService: PrismaUtilsService;
  // passwordService: PasswordService;

  cleanup(): Promise<void>;
  close(): Promise<void>;
}

export async function initializeApp() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideModule(PersistenceModule)
    .useModule(PersistenceTestModule)
    .overrideProvider(PrismaService)
    .useClass(PrismaTestService)
    .overrideModule(SchedulersModule)
    .useModule(SchedulersTestModule)
    .overrideProvider(BullmqProducerService)
    .useClass(BullmqTestProducerService)
    .compile();

  const prismaUtilsService = moduleRef.get<PrismaUtilsService>(PrismaUtilsService);
  // const prismaUtilsService = moduleRef.get<PrismaTestService>(PrismaService);
  // const passwordService = moduleRef.get(PasswordService);
  const app = moduleRef.createNestApplication();
  await app.init();

  const cleanup = async () => {
    await prismaUtilsService.resetDB();
  };

  const close = async () => {
    await app.close();
    // await prismaService.$disconnect();
  };

  return { app, prismaUtilsService, cleanup, close };
}
