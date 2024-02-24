import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'SuccessfulResponse' })
export class SuccessfulResponse {
  @Field(() => String, { description: 'Response' })
  message: string;
}
