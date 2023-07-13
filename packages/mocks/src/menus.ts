import { IMenu, IMenuData, getCurrentMenu } from '@packages/domains';
import { categoriesMock } from './categories';
import { productsMock } from './products';

export const menusMock: IMenuData[] = [
  {
    id: '0c0f2532-2181-11ee-be56-0242ac120002',
    fromDate: new Date(2023, 6, 1),
    toDate: new Date(2023, 6, 31),
    name: 'Birthday menu',
    number: 1,
    lines: [
      {
        id: 'cec6224c-2181-11ee-be56-0242ac120002',
        price: 100,
        productId: productsMock[0].id,
      },
      {
        id: 'cec626b6-2181-11ee-be56-0242ac120002',
        price: 150,
        productId: productsMock[1].id,
      },
      {
        id: 'cec62b7a-2181-11ee-be56-0242ac120002',
        price: 200,
        productId: productsMock[2].id,
      },
      {
        id: 'cec62cc4-2181-11ee-be56-0242ac120002',
        price: 250,
        productId: productsMock[3].id,
      },
      {
        id: 'cec62e0e-2181-11ee-be56-0242ac120002',
        price: 190,
        productId: productsMock[4].id,
      },
      {
        id: 'cec62f30-2181-11ee-be56-0242ac120002',
        price: 70,
        productId: productsMock[5].id,
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
