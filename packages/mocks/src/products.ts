import { IProductData } from '@packages/domains';

export const productsMock: IProductData[] = [
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
