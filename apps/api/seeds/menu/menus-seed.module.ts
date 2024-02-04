import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';

import { MenusSeedService } from './menus-seed.service';

@Module({
  imports: [PersistenceModule],
  providers: [MenusSeedService],
  exports: [MenusSeedService],
})
export class MenusSeedModule {}
