import { ArgsType, Field } from '@nestjs/graphql';

import { FindAllBaseArgs } from '@/modules/common/base.dto';

type SortType = 'ASC' | 'DESC';
@ArgsType()
export class FindTokensArgs extends FindAllBaseArgs {
  @Field(() => String)
  sortBy: SortType;
}
