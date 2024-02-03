import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '@/modules/common/base.entity';

import { MenuLine } from './menu-line';

@ObjectType({ description: 'Menu' })
export class Menu extends BaseEntity {
  @Field()
  name: string;

  @Field(() => [MenuLine])
  lines: MenuLine[];
}
