import { InputType, PartialType } from '@nestjs/graphql';

import { CreateActivationCodeInput } from './create-activation-code.input';

@InputType('UpdateActivationCodeWithoutCodeInput', { description: 'Update activationCode without code input' })
export class UpdateActivationCodeWithoutCodeInput extends PartialType(CreateActivationCodeInput) {}

@InputType('UpdateActivationCodeInput', { description: 'Update activationCode code input' })
export class UpdateActivationCodeInput extends PartialType(CreateActivationCodeInput) {}
