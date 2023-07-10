import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../types/base.entity';

@ObjectType()
export class CategoryEntity extends BaseEntity {
  @Field()
  name: string;
}
