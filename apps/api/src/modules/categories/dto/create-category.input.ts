import { InputType } from '@nestjs/graphql';

import { CreateBaseNamedInput } from '@/modules/common/base.dto';

@InputType('CreateCategoryInput', { description: 'Create category input' })
export class CreateCategoryInput extends CreateBaseNamedInput {}
