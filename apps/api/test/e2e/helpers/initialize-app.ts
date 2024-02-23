import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';
import { SchedulersModule } from '@/core/schedulers/shcedulers.module';
import { PasswordService } from '@/modules/auth/password.service';

import { AppModule } from '../../../src/app.module';
import { BullmqTestProducerService } from './bullmq-test-producer.service';
import { PrismaTestService } from './prisma-test.service';
import { SchedulersTestModule } from './schedulers-test.module';

export interface E2EApp {
  app: INestApplication;
  prisma: PrismaTestService;
  passwordService: PasswordService;

  cleanup(): Promise<void>;
  close(): Promise<void>;
}

export async function initializeApp() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideModule(SchedulersModule)
    .useModule(SchedulersTestModule)
    .overrideProvider(PrismaService)
    .useClass(PrismaTestService)
    .overrideProvider(BullmqProducerService)
    .useClass(BullmqTestProducerService)
    .compile();

  const prisma = moduleRef.get<PrismaTestService>(PrismaService);
  const passwordService = moduleRef.get(PasswordService);

  const app = moduleRef.createNestApplication();
  await app.init();

  const cleanup = async () => {
    // await prisma.resetDB();
    await prisma.$transaction([
      prisma.orderLine.deleteMany(),
      prisma.order.deleteMany(),
      prisma.menuLine.deleteMany(),
      prisma.menu.deleteMany(),
      prisma.product.deleteMany(),
      prisma.category.deleteMany(),
      prisma.activationCode.deleteMany(),
      prisma.user.deleteMany(),
      prisma.customer.deleteMany(),
    ]);
  };

  const close = async () => {
    await app.close();
    // await prisma.$disconnect();
  };

  return { app, prisma, passwordService, cleanup, close };
}
