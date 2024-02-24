import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '@/modules/users/models/user.model';

import { Tokens } from './tokens.result';

@ObjectType({ description: 'Auth' })
export class Auth extends Tokens {
  @Field(() => User, { description: 'User' })
  user: Omit<User, 'passwordHash'>;
}
