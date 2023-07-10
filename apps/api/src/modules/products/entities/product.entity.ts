import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../types/base.entity';

@ObjectType()
export class ProductEntity extends BaseEntity {
  @Field()
  name: string;
}
