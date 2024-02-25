import { Field, ID, Int, ObjectType, OmitType } from '@nestjs/graphql';

import { BaseEntity } from '@/modules/common/base.entity';
import { User } from '@/modules/users/models/user.model';

@ObjectType({ description: 'ActivationCode' })
export class ActivationCode extends BaseEntity {
  @Field({ description: 'Activation code' })
  code: string;

  @Field(() => User, { description: 'User' })
  user: User;

  @Field(() => Int, { description: 'Attempts number' })
  attempts: number;
}

@ObjectType({ description: 'ActivationCodeWithKeys' })
export class ActivationCodeWithKeys extends OmitType(ActivationCode, ['user', 'code', 'attempts'] as const) {
  @Field(() => ID, { description: 'User Id' })
  userId: string;
}
