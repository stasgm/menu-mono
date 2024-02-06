import { Logger } from '@nestjs/common';

export abstract class SeedService {
  readonly logger = new Logger('SeedService');

  constructor(readonly name: string) {}

  logInfo(type: 'SEED' | 'REMOVE'): void {
    this.logger.log(`  ${type === 'SEED' ? '🌻' : '🗑 '} ${this.name}`);
  }

  abstract removeAll(): void;
  abstract seed(): void;
  // TODO add seedTestData implementation
  // abstract seedTestData(): void;
}
