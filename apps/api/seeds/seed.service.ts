import { Logger } from '@nestjs/common';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { PrismaModel } from '@/core/persistence/prisma/prisma.types';

export const SeedService = <Model extends PrismaModel>(modelName: Model) => {
  abstract class SeedServiceHost {
    readonly logger = new Logger('SeedService');
    readonly model;
    readonly _modelName = modelName.toString();

    constructor(readonly prisma: PrismaService) {
      const _model = prisma[modelName];

      if (!_model) {
        throw new Error(`Entity not found`);
      }

      this.model = _model;
    }

    logInfo(type: 'SEED' | 'REMOVE'): void {
      this.logger.log(`   ${type === 'SEED' ? '🌻' : '🗑 '}  ${this._modelName}`);
    }

    removeAll(): void {
      this.logInfo('REMOVE');
    }

    seed(): void {
      this.logInfo('SEED');
    }
    // TODO add seedTestData implementation
    // abstract seedTestData(): void;
  }
  return SeedServiceHost;
};
