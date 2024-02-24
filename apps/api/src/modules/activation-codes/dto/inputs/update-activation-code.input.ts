import { InputType, PartialType } from '@nestjs/graphql';

import { CreateActivationCodeInput } from './create-activation-code.input';

@InputType('UpdateActivationWithoutCodeCodeInput', { description: 'Update activationCode without code input' })
export class UpdateActivationWithoutCodeCodeInput extends PartialType(CreateActivationCodeInput) {}

@InputType('UpdateActivationCodeInput', { description: 'Update activationCode code input' })
export class UpdateActivationCodeInput extends PartialType(CreateActivationCodeInput) {}
