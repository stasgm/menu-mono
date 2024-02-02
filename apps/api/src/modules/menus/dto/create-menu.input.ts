import { Field, InputType } from '@nestjs/graphql';

import { CreateMenuLineInput } from './create-menu-line.input';

@InputType()
export class CreateMenuInput {
  @Field()
  name: string;

  @Field(() => [CreateMenuLineInput], { nullable: true })
  lines?: CreateMenuLineInput[];
}
