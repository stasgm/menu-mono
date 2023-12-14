import {
  IOrder,
  IProductSelection,
  calculateProductsQuantity,
  calculateTotalPrice,
  generateOrderLines,
} from '@packages/domains';
import { menuMock } from './menus';
import { customersMock } from './customers';

const productSelection1: IProductSelection = {
  [menuMock.lines[0].product.id]: {
    price: menuMock.lines[0].price,
    quantity: 2,
  },
  [menuMock.lines[1].product.id]: {
    price: menuMock.lines[1].price,
    quantity: 3,
  },
  [menuMock.lines[2].product.id]: {
    price: menuMock.lines[2].price,
    quantity: 8,
  },
};

const productSelection2: IProductSelection = {
  [menuMock.lines[1].product.id]: {
    price: menuMock.lines[0].price,
    quantity: 2,
  },
  [menuMock.lines[1].product.id]: {
    price: menuMock.lines[1].price,
    quantity: 3,
  },
  [menuMock.lines[2].product.id]: {
    price: menuMock.lines[2].price,
    quantity: 8,
  },
};

export const ordersMock: IOrder[] = [
  {
    id: '0c0f2690-2181-11ee-be56-0242ac120002',
    date: '2023-07-18',
    number: 1,
    status: 'NEW',
    customerId: customersMock[0].id,
    orderLines: generateOrderLines(productSelection1),
    productSelection: productSelection1,
    totalAmount: calculateTotalPrice(productSelection1),
    totalProductQuantity: calculateProductsQuantity(productSelection1),
  },
  {
    id: '0c0f2691-2181-11ee-be56-0242ac120002',
    date: '2023-07-20',
    number: 2,
    status: 'NEW',
    customerId: customersMock[1].id,
    orderLines: generateOrderLines(productSelection2),
    productSelection: productSelection2,
    totalAmount: calculateTotalPrice(productSelection2),
    totalProductQuantity: calculateProductsQuantity(productSelection2),
  },
];
