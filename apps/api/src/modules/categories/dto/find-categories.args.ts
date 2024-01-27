import { ArgsType } from '@nestjs/graphql';

import { PaginationArgs } from '../../common/base.dto';

@ArgsType()
export class FindCategoriesArgs extends PaginationArgs {
  skip: number;
  take: number;
}
