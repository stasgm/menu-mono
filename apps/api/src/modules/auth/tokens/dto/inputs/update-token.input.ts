import { InputType, PartialType } from '@nestjs/graphql';

import { CreateTokenInput } from './create-token.input';

@InputType('UpdateTokenWithoutTokenInput', { description: 'Update token without code input' })
export class UpdateTokenWithoutTokenInput extends PartialType(CreateTokenInput) {}

@InputType('UpdateTokenInput', { description: 'Update token code input' })
export class UpdateTokenInput extends PartialType(CreateTokenInput) {}
