import { ArgsType, Field, InputType, Int, ObjectType, OmitType, PartialType } from '@nestjs/graphql';

import { BaseEntity } from './base.entity';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip: number = 0;

  @Field(() => Int, { defaultValue: 100, nullable: true })
  take: number = 100;
}

@ArgsType()
export class FindAllBaseDTO extends PaginationArgs {}

@InputType({ isAbstract: true })
export class CreateBaseDTO {
  @Field()
  name: string;
}

@InputType({ isAbstract: true })
export class UpdateBaseDTO extends PartialType(CreateBaseDTO) {}

// @InputType({ isAbstract: true })
// export class QueryBaseDTO {
//   @Field(() => ID)
//   id?: string;
// }
