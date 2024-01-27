import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
  @Field(() => String, { description: 'JWT access token' })
  accessToken: string;

  @Field(() => String, { description: 'JWT refresh token' })
  refreshToken: string;
}
