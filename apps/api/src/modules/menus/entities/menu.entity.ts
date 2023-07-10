import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../types/base.entity';

@ObjectType()
export class MenuEntity extends BaseEntity {
  @Field()
  name: string;
}
