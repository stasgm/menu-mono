import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../types/base.entity';
import { Category } from '../../../graphql.schema';

@ObjectType()
export class ProductEntity extends BaseEntity {
  @Field()
  name: string;

  // @Field(() => Category, { nullable: true })
  // categories: Category[];
}
