import { InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType('UpdateUserInput', { description: 'Update user input' })
export class UpdateUserInput extends PartialType(OmitType(CreateUserInput, ['passwordHash'] as const)) {}
