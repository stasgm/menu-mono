import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../users/models/user.model';
import { Tokens } from './tokens.model';

@ObjectType({ description: 'Auth' })
export class Auth extends Tokens {
  @Field(() => User, { description: 'User' })
  user: User;
}
