import { Field, InputType } from '@nestjs/graphql';

import { CreateBaseInput } from '@/modules/common/base.dto';

@InputType('CreateTokenInput', { description: 'Create token input' })
export class CreateTokenInput extends CreateBaseInput {
  @Field(() => String, { description: 'User Id' })
  userId: string;
}
