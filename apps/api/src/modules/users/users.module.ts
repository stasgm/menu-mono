import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../core/persistence/persistence.module';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, UsersRepository],
  imports: [PersistenceModule],
  exports: [UsersService],
})
export class UsersModule {}
