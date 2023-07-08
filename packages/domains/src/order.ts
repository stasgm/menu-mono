import { IMenu } from './menu';

export interface IProductSelection {
  // id: string;
  // productId: string;
  quantity: number;
}

export type OrderStatusT = 'new' | 'confirmed' | 'rejected';

export interface ICustomerDetails {
  name: string;
  phoneNumber: string;
}

export interface IProductSelections {
  [productId: string]: IProductSelection;
}

export interface IOrder {
  number: number;
  date: Date;
  customerDetails: ICustomerDetails;
  totalAmount: number;
  productSelections: IProductSelections;
  orderLines: IOrderLine[];
  status: OrderStatusT;
  totalProductQuantity: number;
}

export interface IOrderLine {
  productId: string;
  quantity: number;
  price: number;
  totalAmount: number;
}

// export const getOrder = (order: IOrder, menu: IMenu | null): IOrder => {
//   const orderLines = generateOrderLines(order.productSelections, menu);
//   const totalAmount = calculateTotalPrice(order.productSelections, menu);

//   return {
//     ...order,
//     totalAmount,
//     orderLines,
//   };
// };

/**
 * Calculate the total order value
 */
export const calculateTotalPrice = (productSelections: IProductSelections, menu: IMenu | null): number => {
  return Object.entries(productSelections).reduce((acc, [key, cur]) => {
    const menuLine = menu?.lines.find((el) => el.product.id === key);

    return acc + (menuLine ? cur.quantity * menuLine.price : 0);
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
export const generateOrderLines = (productSelections: IProductSelections, menu: IMenu | null): IOrderLine[] => {
  return Object.entries(productSelections).map(([key, cur]) => {
    const menuLine = menu?.lines.find((el) => el.product.id === key);

    return {
      productId: key,
      quantity: cur.quantity,
      price: menuLine?.price ?? 0,
      totalAmount: menuLine ? cur.quantity * menuLine.price : 0,
    };
  }, []);
};
