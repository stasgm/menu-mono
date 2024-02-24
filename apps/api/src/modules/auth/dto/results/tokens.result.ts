import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';

@ObjectType({ description: 'Tokens' })
export class Tokens {
  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  accessToken: string;

  @Field(() => GraphQLJWT, { description: 'JWT refresh token' })
  refreshToken: string;
}
