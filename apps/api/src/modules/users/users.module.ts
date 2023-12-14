import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../core/persistence/persistence.module';
import { AuthModule } from '../auth/auth.module';
import { CustomersModule } from '../customers/customers.module';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, UsersRepository],
  imports: [PersistenceModule, CustomersModule, AuthModule],
  exports: [UsersService],
})
export class UsersModule {}
