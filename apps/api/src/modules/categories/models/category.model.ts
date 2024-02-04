import { Field, ObjectType } from '@nestjs/graphql';

import { BaseNamedEntity } from '@/modules/common/base.entity';

@ObjectType({ description: 'Category' })
export class Category extends BaseNamedEntity {
  @Field({ description: 'Category name' })
  name: string;
}
