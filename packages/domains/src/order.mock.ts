import { ICategory } from './category';
import { IMenu, IMenuData, getCurrentMenu } from './menu';
import { IProductData } from './product';

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
  {
    id: '5',
    name: 'Muffin',
    categories: ['2', '3', '7'],
  },
  {
    id: '6',
    name: 'Water with lemon and sault',
    categories: ['1', '5'],
  },
];

export const menus: IMenuData[] = [
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

export const menu: IMenu = getCurrentMenu({
  currentDate: new Date(2023, 6, 18),
  categories,
  menus,
  products,
});
