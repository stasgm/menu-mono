import { Module } from '@nestjs/common';

import { PersistenceModule } from '../_core/persistence/persistence.module';
import { MenusRepository } from './menus.repository';
import { MenusResolver } from './menus.resolver';
import { MenusService } from './menus.service';

@Module({
  providers: [MenusResolver, MenusService, MenusRepository],
  imports: [PersistenceModule],
})
export class MenusModule {}
