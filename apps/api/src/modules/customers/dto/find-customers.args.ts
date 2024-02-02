import { ArgsType } from '@nestjs/graphql';

import { FindAllBaseArgs } from '../../common/base.dto';

@ArgsType()
export class FindCustomersArgs extends FindAllBaseArgs {}
