import { IProductData, getProduct } from '@packages/domains';
import { categoriesMock } from './categories';

export const productsMock: IProductData[] = [
  {
    id: '0c0f2ae6-2181-11ee-be56-0242ac120002',
    name: 'Tea',
    categories: [categoriesMock[0].id, categoriesMock[5].id],
    image:
      'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137148/Gramercy-Tavern-Burger-and-Kielbasa-Kit-6.4.21-72ppi-1x1-15.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
  },
  {
    id: '5447f4dc-2181-11ee-be56-0242ac120002',
    name: 'Coffee',
    categories: [categoriesMock[0].id],
    image:
      'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137148/Gramercy-Tavern-Burger-and-Kielbasa-Kit-6.4.21-72ppi-1x1-15.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
  },
  {
    id: '5447efdc-2181-11ee-be56-0242ac120002',
    name: 'Cheesecake',
    categories: [categoriesMock[1].id, categoriesMock[3].id],
  },
  {
    id: '5447eea6-2181-11ee-be56-0242ac120002',
    name: 'Sandwich',
    categories: [categoriesMock[2].id, categoriesMock[4].id, categoriesMock[6].id],
    image:
      'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137148/Gramercy-Tavern-Burger-and-Kielbasa-Kit-6.4.21-72ppi-1x1-15.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
  },
  {
    id: '5447ed7a-2181-11ee-be56-0242ac120002',
    name: 'Muffin',
    categories: [categoriesMock[1].id, categoriesMock[2].id, categoriesMock[6].id],
    disabled: true,
    image:
      'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137148/Gramercy-Tavern-Burger-and-Kielbasa-Kit-6.4.21-72ppi-1x1-15.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
  },
  {
    id: '5447eaa0-2181-11ee-be56-0242ac120002',
    name: 'Water with lemon and sault',
    categories: [categoriesMock[0].id, categoriesMock[4].id],
  },
];

export const getProductsMock = () => {
  return productsMock.map((el) => {
    return getProduct(productsMock, categoriesMock, el.id);
  });
};
