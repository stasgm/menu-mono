import { IMenu, IMenuData, getCurrentMenu } from '@packages/domains';
import { categoriesMock } from './categories';
import { productsMock } from './products';

export const menusMock: IMenuData[] = [
  {
    id: '1',
    fromDate: new Date(2023, 6, 1),
    toDate: new Date(2023, 6, 31),
    name: 'Birthday menu',
    lines: [
      {
        id: '1',
        price: 100,
        productId: '1',
      },
      {
        id: '2',
        price: 150,
        productId: '2',
      },
      {
        id: '3',
        price: 200,
        productId: '3',
      },
      {
        id: '4',
        price: 250,
        productId: '4',
      },
      {
        id: '5',
        price: 190,
        productId: '5',
      },
      {
        id: '6',
        price: 70,
        productId: '6',
      },
    ],
  },
];

export const menuMock: IMenu = getCurrentMenu({
  currentDate: new Date(2023, 6, 18),
  categories: categoriesMock,
  menus: menusMock,
  products: productsMock,
});
