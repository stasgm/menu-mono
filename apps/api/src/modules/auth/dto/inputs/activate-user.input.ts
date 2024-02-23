import { Field, InputType } from '@nestjs/graphql';

@InputType('ActivateUserInput', { description: 'Activate user input' })
export class ActivateUserInput {
  @Field(() => String, { description: 'Activation code' })
  activationCode: string;
}
