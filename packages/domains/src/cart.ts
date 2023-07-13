import { IOrderLine, IProductSelections } from './order';

export interface IUserData {
  name: string;
  phoneNumber: string;
}

export interface ICart {
  date: string;
  userData: IUserData;
  productSelections: IProductSelections;
  lines: IOrderLine[];
  totalAmount: number;
  totalProductQuantity: number;
}
