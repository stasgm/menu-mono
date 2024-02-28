import { Module } from '@nestjs/common';

import { AppConfigModule } from '@/core/config/app-config.module';
import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { PasswordService } from '@/modules/auth/password.service';

import { PrismaUtilsService } from './prisma-test-utils.service';

@Module({
  imports: [AppConfigModule],
  providers: [PrismaService, PasswordService, PrismaUtilsService],
  exports: [PrismaService, PrismaUtilsService],
})
export class PersistenceTestModule {}
