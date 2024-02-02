import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Auth model' })
export class Auth {
  @Field(() => String, { description: 'JWT access token' })
  accessToken: string;

  @Field(() => String, { description: 'JWT refresh token' })
  refreshToken: string;
}
