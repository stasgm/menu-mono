import { Field, ObjectType } from '@nestjs/graphql';

import { Category } from '@/modules/categories/models/category.model';
import { BaseNamedEntity } from '@/modules/common/base.entity';

@ObjectType({ description: 'Product' })
export class Product extends BaseNamedEntity {
  @Field(() => Boolean, { description: 'Product disabled' })
  disabled: boolean;

  @Field(() => [Category]!, { description: 'Product categories' })
  categories: Category[];
}

@ObjectType({ description: 'ProductWithKeys' })
export class ProductWithKeys extends BaseNamedEntity {
  @Field(() => Boolean, { description: 'Product disabled' })
  disabled: boolean;

  @Field(() => [String]!, { description: 'Product categories' })
  categories: string[];
}
