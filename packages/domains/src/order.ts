import { v4 as uuid } from 'uuid';

export interface IProductSelectionItem {
  quantity: number;
  price: number;
}

export interface IProductSelection {
  [productId: string]: IProductSelectionItem;
}

export interface IOrder {
  id: string;
  number: number;
  date: string;
  customerId: string;
  productSelection: IProductSelection;
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
export const calculateTotalPrice = (productSelection: IProductSelection): number => {
  return Object.values(productSelection).reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);
};

/**
 * Calculate the total quantity of product in the order
 */
export const calculateProductsQuantity = (productSelection: IProductSelection): number => {
  return Object.values(productSelection).reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
};

/**
 * Generate order lines
 */
export const generateOrderLines = (productSelection: IProductSelection): IOrderLine[] => {
  return Object.entries(productSelection).map(([key, cur]) => {
    return {
      id: uuid(),
      productId: key,
      quantity: cur.quantity,
      price: cur.price,
      totalAmount: cur.quantity * cur.price,
    };
  });
};
