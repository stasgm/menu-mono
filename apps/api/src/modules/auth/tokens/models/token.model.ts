import { Field, ID, ObjectType, OmitType } from '@nestjs/graphql';

import { BaseEntity } from '@/modules/common/base.entity';
import { User } from '@/modules/users/models/user.model';

@ObjectType({ description: 'Token' })
export class Token extends BaseEntity {
  @Field({ description: 'Token hash' })
  token: string;

  @Field({ description: 'User' })
  user: User;
}

@ObjectType({ description: 'TokenWithKeys' })
export class TokenWithKeys extends OmitType(Token, ['user', 'token'] as const) {
  @Field(() => ID, { description: 'User Id' })
  userId: string;
}
