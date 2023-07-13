import {
  IOrder,
  IProductSelections,
  calculateProductsQuantity,
  calculateTotalPrice,
  generateOrderLines,
} from '@packages/domains';
import { menuMock } from './menus';
import { usersMock } from './users';

const productSelections: IProductSelections = {
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

export const ordersMock: IOrder[] = [
  {
    id: '0c0f2690-2181-11ee-be56-0242ac120002',
    date: '2023-07-18',
    number: 1,
    status: 'NEW',
    userId: usersMock[0].id,
    orderLines: generateOrderLines(productSelections),
    productSelections: productSelections,
    totalAmount: calculateTotalPrice(productSelections),
    totalProductQuantity: calculateProductsQuantity(productSelections),
  },
];
