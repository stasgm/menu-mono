import { Logger } from '@nestjs/common';

import { PrismaService } from '@/core/persistence/prisma/prisma.service';
import { PrismaModel } from '@/core/persistence/prisma/prisma.types';

export const SeedService = <Model extends PrismaModel>(_model: Model) => {
  abstract class SeedServiceHost {
    readonly logger = new Logger('SeedService');
    readonly model;
    readonly _modelMame = _model.toString();

    constructor(readonly prisma: PrismaService) {
      const mod = prisma[_model];

      if (!mod) {
        throw new Error(`Entity not found`);
      }

      this.model = mod;
    }

    logInfo(type: 'SEED' | 'REMOVE'): void {
      this.logger.log(`   ${type === 'SEED' ? '🌻' : '🗑 '}  ${this._modelMame}`);
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
