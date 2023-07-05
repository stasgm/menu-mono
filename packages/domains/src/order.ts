import { IMenu } from './menu';

export interface IProductSelection {
  id: string;
  productId: number;
  quantity: number;
}

export type OrderStatusT = 'new' | 'confirmed' | 'rejected';

export interface IOrder {
  id: string;
  number: number;
  date: Date;
  customerDetails: {
    name: string;
    phoneNumber: string;
  };
  totalAmount: number;
  productSelections: IProductSelection[];
  orderLines: IOrderLine[];
  status: OrderStatusT;
}

export interface IOrderLine {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

/**
 * Calculate the total order value
 */
export const calculateTotalPrice = (productSelections: IProductSelection[], menu: IMenu): number => {
  return productSelections.reduce((acc, cur) => {
    const menuLine = menu.lines.find((el) => el.product.id === cur.productId);

    return acc + (menuLine ? cur.quantity * menuLine.price : 0);
  }, 0);
};

/**
 * Calculate the total quantity of product in the order
 */
export const calculateProductsQuantity = (productSelections: IProductSelection[]): number => {
  return productSelections.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
};
