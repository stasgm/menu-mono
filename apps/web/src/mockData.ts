import { IMenuline, ICategory, IProduct, IProductData, IMenuData, getCurrentMenu, IMenu } from '@packages/shared';

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
    fromDate: new Date(2023, 7, 1),
    toDate: new Date(2023, 7, 31),
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

export const initialMenu: IMenu = getCurrentMenu({
  currentDate: new Date(2023, 7, 18),
  categories,
  menus,
  products,
});
// export const initialMenu: IMenuline[] = [
//   {
//     id: 1,
//     product: {
//       id: 1,
//       name: 'Tea',
//     },
//     price: 100,
//     quantity: 0,
//   },
//   {
//     id: 2,
//     product: {
//       id: 2,
//       name: 'Coffee',
//     },
//     price: 150,
//     quantity: 0,
//   },
//   {
//     id: 3,
//     product: {
//       id: 3,
//       name: 'Cheesecake',
//     },
//     price: 250,
//     quantity: 0,
//   },
//   {
//     id: 4,
//     product: {
//       id: 4,
//       name: 'Sandwich',
//     },
//     price: 200,
//     quantity: 0,
//   },
// ];
