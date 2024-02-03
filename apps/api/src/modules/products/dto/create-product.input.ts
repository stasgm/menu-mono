import { Field, InputType } from '@nestjs/graphql';

// import { Category } from '../../categories/models/category.model';
import { CreateBaseNamedInput } from '@/modules/common/base.dto';

@InputType('CreateProductInput', { description: 'Create product input' })
export class CreateProductInput extends CreateBaseNamedInput {
  // @Field(() => [String])
  // categories: string[];

  @Field(() => Boolean)
  disabled: boolean;
}
