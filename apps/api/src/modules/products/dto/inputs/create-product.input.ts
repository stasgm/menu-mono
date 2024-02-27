import { Field, InputType } from '@nestjs/graphql';

// import { Category } from '@/modules/categories/models/category.model';
import { CreateBaseNamedInput } from '@/modules/common/base.dto';

@InputType('CreateProductInput', { description: 'Create product input' })
export class CreateProductInput extends CreateBaseNamedInput {
  @Field(() => String, { description: 'Product name' })
  name: string;

  @Field(() => Boolean, { description: 'Product disabled' })
  disabled: boolean;

  @Field(() => [String], { description: "Product's categories" })
  categories: string[];
}
