import { InputType, PartialType } from '@nestjs/graphql';

import { CreateCategoryInput } from './create-category.input';

@InputType('UpdateCategoryInput', { description: 'Update category input' })
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}
