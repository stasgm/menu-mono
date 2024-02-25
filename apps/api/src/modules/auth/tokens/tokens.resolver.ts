import { Resolver } from '@nestjs/graphql';

import { BaseResolver } from '@/modules/common/base.resolver';

import { CreateTokenInput } from './dto/inputs/create-token.input';
import { UpdateTokenInput } from './dto/inputs/update-token.input';
import { Token } from './models/token.model';
import { TokensService } from './tokens.service';

@Resolver(() => Token)
export class TokensResolver extends BaseResolver(Token, Token, CreateTokenInput, UpdateTokenInput) {
  constructor(readonly tokensService: TokensService) {
    super(tokensService);
  }
}
