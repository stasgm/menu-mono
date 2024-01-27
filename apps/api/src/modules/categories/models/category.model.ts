import { ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/base.entity';

@ObjectType({ description: 'Category' })
export class Category extends BaseEntity {
  // @Field(() => ID)
  // id: string;

  // @Field()
  // name: string;
}
