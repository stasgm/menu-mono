import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../../persistence.module';
import { MenusSeedService } from './menus-seed.service';

@Module({
  imports: [PersistenceModule],
  providers: [MenusSeedService],
  exports: [MenusSeedService],
})
export class MenusSeedModule {}
