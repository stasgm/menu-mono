export interface IProductSelection {
  quantity: number;
  price: number;
}

const OrderStatuses = ['NEW', 'CONFIRMED', 'REJECTED'] as const;

export type OrderStatusT = (typeof OrderStatuses)[number];

export interface ICustomerDetails {
  name: string;
  phoneNumber: string;
}

export interface IProductSelections {
  [productId: string]: IProductSelection;
}

export interface IOrder {
  id: string;
  number: string;
  date: string;
  customerDetails: ICustomerDetails;
  totalAmount: number;
  productSelections: IProductSelections;
  orderLines: IOrderLine[];
  status: OrderStatusT;
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
      id: key,
      productId: key,
      quantity: cur.quantity,
      price: cur.price,
      totalAmount: cur.quantity * cur.price,
    };
  }, []);
};
