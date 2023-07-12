import { Module } from '@nestjs/common';

import { PersistenceModule } from '../_core/persistence/persistence.module';
import { UsersModule } from '../users/users.module';
import { OrdersRepository } from './orders.repository';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersResolver, OrdersService, OrdersRepository],
  imports: [PersistenceModule, UsersModule],
})
export class OrdersModule {}
