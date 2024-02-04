import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';
import { CustomersModule } from '@/modules/customers/customers.module';

import { OrdersRepository } from './orders.repository';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersResolver, OrdersService, OrdersRepository],
  imports: [PersistenceModule, CustomersModule],
})
export class OrdersModule {}
