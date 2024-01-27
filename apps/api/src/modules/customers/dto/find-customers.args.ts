import { ArgsType } from '@nestjs/graphql';

import { PaginationArgs } from '../../common/base.dto';

@ArgsType()
export class FindCustomersArgs extends PaginationArgs {};
