import { Field, InputType } from '@nestjs/graphql';

import { CreateBaseInput } from '@/modules/common/base.dto';

@InputType('CreateActivationCodeInput', { description: 'Create activationCode input' })
export class CreateActivationCodeInput extends CreateBaseInput {
  @Field(() => String, { description: 'User Id' })
  userId: string;
}
