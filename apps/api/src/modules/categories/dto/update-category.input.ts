import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryInput } from './create-category.input';

export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  id: number;
}
