import { Module } from '@nestjs/common';

import { AppConfig } from '@/core/config/app-config';

import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [PrismaService, AppConfig],
  exports: [PrismaService],
})
export class PersistenceModule {}
