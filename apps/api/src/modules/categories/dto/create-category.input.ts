import { InputType } from '@nestjs/graphql';

import { CreateBaseDTO } from '../../common/base.dto';

@InputType()
export class CreateCategoryInput extends CreateBaseDTO {}
