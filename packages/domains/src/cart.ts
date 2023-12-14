import { IOrderLine, IProductSelection } from './order';

export interface IUserData {
  name: string;
  phoneNumber: string;
}

export interface ICart {
  date: string;
  userData: IUserData;
  productSelection: IProductSelection;
  lines: IOrderLine[];
  totalAmount: number;
  totalProductQuantity: number;
}
