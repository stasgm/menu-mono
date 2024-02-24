import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';

@ObjectType({ description: 'Activation token' })
export class ActivationToken {
  @Field(() => GraphQLJWT, { description: 'JWT activation token' })
  activationToken: string;
}
