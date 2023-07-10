import { Category } from '../../../graphql.schema';

export class CreateProductInput {
  name: string;
  categories: Category[];
}
