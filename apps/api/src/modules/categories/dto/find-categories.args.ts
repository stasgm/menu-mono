import { ArgsType } from '@nestjs/graphql';

import { FindAllBaseDTO } from '../../common/base.dto';

@ArgsType()
export class FindCategoriesArgs extends FindAllBaseDTO {}
