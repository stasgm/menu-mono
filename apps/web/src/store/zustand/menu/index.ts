import { StateCreator } from 'zustand';
import { gql } from '@apollo/client';

import { IMenu } from '@packages/domains';
// import { menu } from '@packages/domains/src/order.mock';
import client from '../../../utils/apollo-client';

export interface MenuSlice {
  menu: IMenu | null;
  menuActions: {
    fetchMenu: () => void;
  };
}

const delay = (ms: number) => {
  return new Promise((res, _) => setTimeout(res, ms));
};

export const createMenuSlice: StateCreator<MenuSlice, [], [], MenuSlice> = (set, get) => ({
  menu: null,
  menuActions: {
    fetchMenu: async () => {
      // const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20');
      // set({ products: await res.json() });
      // await axios.post<IOrder>(process.env.NEXT_PUBLIC_API_SERVER ?? 'localhost:3000', order);
      // await delay(500);

      const { data } = await client.query({
        query: gql`
          query Query {
            menus {
              id
              name
              lines {
                id
                price
                product {
                  id
                  name
                  categories {
                    name
                    id
                  }
                }
              }
            }
          }
        `,
      });

      set({ menu: data.menus[0] });
    },
  },
});
