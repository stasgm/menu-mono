import { Module } from '@nestjs/common';

import { AppConfigModule } from '@/core/config/app-config.module';

import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AppConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PersistenceModule {}
