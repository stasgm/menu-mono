import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';
import { PasswordService } from '@/modules/auth/password.service';
import { CustomersModule } from '@/modules/customers/customers.module';
import { CustomersRepository } from '@/modules/customers/customers.repository';

import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, UsersRepository, CustomersRepository, PasswordService],
  imports: [PersistenceModule, CustomersModule],
  exports: [UsersService],
})
export class UsersModule {}
