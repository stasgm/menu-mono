export class CreateMenuInput {
  name: string;
  lines: {
    id: number;
    price: number;
    product: {
      id: number;
      name: string;
    };
  }[];
}
