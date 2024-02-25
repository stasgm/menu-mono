import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';

import { TokensRepository } from './tokens.repository';
import { TokensResolver } from './tokens.resolver';
import { TokensService } from './tokens.service';

@Module({
  imports: [PersistenceModule],
  providers: [TokensResolver, TokensService, TokensRepository],
  exports: [TokensService],
})
export class TokensModule {}
