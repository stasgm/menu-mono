import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class FindUsersArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip: number;

  @Field(() => Int, { defaultValue: 100, nullable: true })
  take: number;
}
