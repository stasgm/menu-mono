import { Field, ObjectType } from '@nestjs/graphql';

import { Category } from '@/modules/categories/models/category.model';
import { BaseNamedEntity } from '@/modules/common/base.entity';

@ObjectType({ description: 'Product' })
export class Product extends BaseNamedEntity {
  @Field(() => [Category]!)
  categories: Category[];

  @Field(() => Boolean)
  disabled: boolean;
}
