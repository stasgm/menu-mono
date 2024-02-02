import { ArgsType, Field } from '@nestjs/graphql';

import { FindAllBaseArgs } from '../../common/base.dto';

type SortType = 'ASC' | 'DESC';
@ArgsType()
export class FindCategoriesArgs extends FindAllBaseArgs {
  @Field(() => String)
  sortBy: SortType;
}
