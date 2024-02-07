import { Field, ObjectType } from '@nestjs/graphql';

// import { User } from '../../user/user.entity';

@ObjectType()
export class AuthUserResponse {
  // @Field((_type) => User)
  // user: User;

  @Field()
  token: string;

  constructor(partial?: Partial<AuthUserResponse>) {
    Object.assign(this, partial);
  }
}
