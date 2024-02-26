import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/common/base.service';

import { Token, TokenWithKeys } from './models/token.model';
import { TokensRepository } from './tokens.repository';

@Injectable()
export class TokensService extends BaseService(Token, TokenWithKeys) {
  constructor(readonly tokensRepository: TokensRepository) {
    super(tokensRepository);
  }

  // findByUserId(id: string) {
  //   return this.tokensRepository.getTokenByUserId({ where: { userId: id } });
  // }
}
