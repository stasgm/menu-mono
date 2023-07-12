import { Module } from '@nestjs/common';

import { MenusResolver } from './menus.resolver';
import { MenusService } from './menus.service';

@Module({
  providers: [MenusResolver, MenusService],
})
export class MenusModule {}
