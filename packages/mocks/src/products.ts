import { IProductData, getProduct } from '@packages/domains';
import { categoriesMock } from './categories';

export const productsMock: IProductData[] = [
  {
    id: '0c0f2ae6-2181-11ee-be56-0242ac120002',
    name: 'Tea',
    description: 'New Tea Research Boasts Heart, Brain, and Immune Benefits',
    categories: [categoriesMock[0].id, categoriesMock[5].id],
    image: 'https://www.themealdb.com/images/ingredients/Grand%20Marnier.png',
    quantity: 4,
  },
  {
    id: '5447f4dc-2181-11ee-be56-0242ac120002',
    name: 'Coffee',
    categories: [categoriesMock[0].id],
    image: 'https://www.themealdb.com/images/media/meals/r33cud1576791081.jpg',
  },
  {
    id: '5447efdc-2181-11ee-be56-0242ac120002',
    name: 'Cheesecake',
    description:
      'A sweet dessert made with a soft fresh cheese (typically cottage cheese, cream cheese, quark or ricotta), eggs, and sugar. It may have a crust or base made from crushed cookies (or digestive biscuits), graham crackers, pastry, or sometimes sponge cake.',
    categories: [categoriesMock[1].id, categoriesMock[3].id],
    image: 'https://www.themealdb.com/images/media/meals/swttys1511385853.jpg',
    quantity: 1,
  },
  {
    id: '5447eea6-2181-11ee-be56-0242ac120002',
    name: 'Sandwich',
    categories: [categoriesMock[2].id, categoriesMock[4].id, categoriesMock[6].id],
    image: 'https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg',
    quantity: 11,
  },
  {
    id: '5447ed7a-2181-11ee-be56-0242ac120002',
    name: 'Muffin',
    categories: [categoriesMock[1].id, categoriesMock[2].id, categoriesMock[6].id],
    disabled: true,
  },
  {
    id: '5447eaa0-2181-11ee-be56-0242ac120002',
    name: 'Water with lemon and sault',
    categories: [categoriesMock[0].id, categoriesMock[4].id],
    image: 'https://www.themealdb.com/images/ingredients/Lemon%20Juice.png',
    quantity: 1,
  },
  {
    id: 'id1',
    name: 'Banana Pancakes',
    description:
      'In a bowl, mash the banana with a fork until it resembles a thick purée. Stir in the eggs, baking powder and vanilla.\r\nHeat a large non-stick frying pan or pancake pan over a medium heat and brush with half the oil. Using half the batter, spoon two pancakes into the pan, cook for 1-2 mins each side, then tip onto a plate. Repeat the process with the remaining oil and batter. Top the pancakes with the pecans and raspberries.',
    categories: [categoriesMock[0].id, categoriesMock[4].id],
    image: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
  },
  {
    id: 'id2',
    name: 'Beef and Oyster pie',
    description: '',
    categories: [categoriesMock[0].id, categoriesMock[4].id],
    image: 'https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg',
    quantity: 2,
  },
  {
    id: 'id3',
    name: 'Blackberry Fool',
    description: '',
    categories: [],
    image: 'https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg',
    quantity: 1,
  },
  {
    id: 'id4',
    name: 'Battenberg Cake',
    description: '',
    categories: [categoriesMock[0].id, categoriesMock[4].id],
    image: 'https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg',
  },
  {
    id: 'id5',
    name: 'Beef Bourguignon',
    description: '',
    categories: [categoriesMock[0].id],
    image: 'https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg',
    quantity: 1,
  },
  {
    id: 'id6',
    name: 'Brie wrapped in prosciutto & brioche',
    description:
      'Chill in the fridge for 30 mins, then brush again with beaten egg and chill for a further 30 mins.',
    categories: [categoriesMock[0].id, categoriesMock[4].id],
    image: 'https://www.themealdb.com/images/media/meals/qqpwsy1511796276.jpg',
    quantity: 1,
  },
  {
    id: 'id7',
    name: 'Breakfast Potatoes',
    description: '',
    categories: [categoriesMock[0].id, categoriesMock[4].id],
    image: 'https://www.themealdb.com/images/media/meals/1550441882.jpg',
  },
  {
    id: 'id8',
    name: 'Big Mac',
    categories: [categoriesMock[4].id],
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    quantity: 2,
  },
  {
    id: 'id9',
    name: 'Burek',
    description:
      'Fry the finely chopped onions and minced meat in oil. Add the salt and pepper. Grease a round baking tray and put a layer of pastry in it. Cover with a thin layer of filling and cover this with another layer of filo pastry which must be well coated in oil. Put another layer of filling and cover with pastry. When you have five or six layers, cover with filo pastry, bake at 200ºC/392ºF for half an hour and cut in quarters and serve.',
    categories: [categoriesMock[0].id, categoriesMock[4].id],
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    quantity: 1,
  },
];

export const getProductsMock = () => {
  return productsMock.map((el) => {
    return getProduct(productsMock, categoriesMock, el.id);
  });
};
