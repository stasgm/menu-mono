import { ArgsType } from '@nestjs/graphql';

import { FindAllBaseArgs } from '@/modules/common/base.dto';

@ArgsType()
export class FindActivationCodesArgs extends FindAllBaseArgs {}
