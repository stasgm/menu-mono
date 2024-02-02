import { ArgsType, Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';

@ArgsType()
class PaginationArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip?: number = 0;

  @Field(() => Int, { defaultValue: 100, nullable: true })
  take?: number = 100;
}

@ArgsType()
export class FindOneBaseArgs {
  @Field(() => ID)
  id: string;
}

@ArgsType()
export class FindAllBaseArgs extends PaginationArgs {}

@InputType({ isAbstract: true })
export class CreateBaseInput {}

@InputType({ isAbstract: true })
export class CreateBaseNamedInput {
  @Field()
  name: string;
}

@InputType({ isAbstract: true })
export class UpdateBaseInput extends PartialType(CreateBaseInput) {}

@InputType({ isAbstract: true })
export class UpdateBaseNamedInput extends PartialType(CreateBaseNamedInput) {}
