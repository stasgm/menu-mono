import {
  IOrder,
  IProductSelections,
  calculateProductsQuantity,
  calculateTotalPrice,
  generateOrderLines,
} from '@packages/domains';
import { menuMock } from './menus';

const productSelections: IProductSelections = {
  [menuMock.lines[0].id]: {
    price: menuMock.lines[0].price,
    quantity: 2,
  },
  [menuMock.lines[1].id]: {
    price: menuMock.lines[1].price,
    quantity: 3,
  },
  [menuMock.lines[2].id]: {
    price: menuMock.lines[2].price,
    quantity: 8,
  },
};

export const ordersMock: IOrder[] = [
  {
    id: '1',
    date: '2023-07-18',
    number: '1',
    status: 'NEW',
    customerDetails: {
      name: 'Stas',
      phoneNumber: 'stas@mail.me',
    },
    orderLines: generateOrderLines(productSelections),
    productSelections: productSelections,
    totalAmount: calculateTotalPrice(productSelections),
    totalProductQuantity: calculateProductsQuantity(productSelections),
  },
];
