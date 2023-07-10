import { CreateMenuInput } from './create-menu.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMenuInput extends PartialType(CreateMenuInput) {
  id: number;
  lines: {
    id: number;
    price: number;
    product: { id: number; name: string };
  }[];
}
