import { v4 as uuid } from 'uuid';

export interface IProductSelection {
  quantity: number;
  price: number;
}

export interface IProductSelections {
  [productId: string]: IProductSelection;
}

export interface IOrder {
  id: string;
  number: number;
  date: string;
  userId: string;
  productSelections: IProductSelections;
  orderLines: IOrderLine[];
  status: string;
  totalAmount: number;
  totalProductQuantity: number;
}

export interface IOrderLine {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  totalAmount: number;
}

/**
 * Calculate the total order value
 */
export const calculateTotalPrice = (productSelections: IProductSelections): number => {
  return Object.values(productSelections).reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);
};

/**
 * Calculate the total quantity of product in the order
 */
export const calculateProductsQuantity = (productSelections: IProductSelections): number => {
  return Object.values(productSelections).reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
};

/**
 * Generate order lines
 */
export const generateOrderLines = (productSelections: IProductSelections): IOrderLine[] => {
  return Object.entries(productSelections).map(([key, cur]) => {
    return {
      id: uuid(),
      productId: key,
      quantity: cur.quantity,
      price: cur.price,
      totalAmount: cur.quantity * cur.price,
    };
  }, []);
};
