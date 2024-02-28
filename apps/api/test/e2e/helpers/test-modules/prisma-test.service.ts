import { Injectable } from '@nestjs/common';

import { AppConfig } from '@/core/config/app-config';
import { PrismaService } from '@/core/persistence/prisma/prisma.service';

@Injectable()
export class PrismaTestService extends PrismaService {
  constructor(readonly appConfig: AppConfig) {
    if (appConfig.envPrefix !== 'test') {
      throw new Error('Enviroment must be only "test"');
    }

    super(appConfig);
  }
}
