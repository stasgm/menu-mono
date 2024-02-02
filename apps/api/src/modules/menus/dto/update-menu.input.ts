import { InputType, PartialType } from '@nestjs/graphql';

import { CreateMenuInput } from './create-menu.input';

@InputType()
export class UpdateMenuInput extends PartialType(CreateMenuInput) {}
