import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../core/persistence/persistence.module';
import { CustomersRepository } from './customers.repository';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';

@Module({
  providers: [CustomersResolver, CustomersService, CustomersRepository],
  imports: [PersistenceModule],
  exports: [CustomersService],
})
export class CustomersModule {}
