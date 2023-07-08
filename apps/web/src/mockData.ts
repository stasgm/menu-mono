import { ICategory, IMenu, IMenuData, IProductData, getCurrentMenu } from '@packages/domains';

export const categories: ICategory[] = [
  {
    id: '1',
    name: 'drinks',
  },
  {
    id: '2',
    name: 'sweets',
  },
  {
    id: '3',
    name: 'snacks',
  },
  {
    id: '4',
    name: 'cake',
  },
  {
    id: '5',
    name: 'salty',
  },
  {
    id: '6',
    name: 'hot',
  },
  {
    id: '7',
    name: 'kosher',
  },
];

export const products: IProductData[] = [
  {
    id: '1',
    name: 'Tea',
    categories: ['1', '6'],
  },
  {
    id: '2',
    name: 'Coffee',
    categories: ['1'],
  },
  {
    id: '3',
    name: 'Cheesecake',
    categories: ['2', '4'],
  },
  {
    id: '4',
    name: 'Sandwich',
    categories: ['3', '5', '7'],
  },
];

export const menus: IMenuData[] = [
  {
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
    ],
  },
];

export const initialMenu: IMenu = getCurrentMenu({
  currentDate: new Date(2023, 6, 18),
  categories,
  menus,
  products,
});
