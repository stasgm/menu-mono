import { ICategory, IProductData, IMenuData } from './order-types';

export const categories: ICategory[] = [
  {
    id: 1,
    name: 'drinks',
  },
  {
    id: 2,
    name: 'sweets',
  },
  {
    id: 3,
    name: 'snacks',
  },
];

export const products: IProductData[] = [
  {
    id: 1,
    name: 'Tea',
    categories: [1],
  },
  {
    id: 2,
    name: 'Coffee',
    categories: [1],
  },
  {
    id: 3,
    name: 'Cheesecake',
    categories: [2],
  },
  {
    id: 4,
    name: 'Sandwich',
    categories: [3],
  },
];

export const menus: IMenuData[] = [
  {
    fromDate: new Date(2023, 6, 1),
    toDate: new Date(2023, 6, 31),
    name: 'Birthday menu',
    lines: [
      {
        id: 1,
        price: 100,
        productId: 1,
      },
      {
        id: 2,
        price: 150,
        productId: 2,
      },
      {
        id: 3,
        price: 200,
        productId: 3,
      },
      {
        id: 4,
        price: 250,
        productId: 4,
      },
    ],
  },
];
