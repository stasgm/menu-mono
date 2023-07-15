import { gql } from '@apollo/client';
import { IMenu } from '@packages/domains';
import { StateCreator } from 'zustand';

import client from '../../../utils/apollo-client';

export interface MenuSlice {
  menu: IMenu | null;
  menuActions: {
    fetchMenu: () => void;
  };
}

export const createMenuSlice: StateCreator<MenuSlice, [], [], MenuSlice> = (
  set,
) => ({
  menu: null,
  menuActions: {
    fetchMenu: async () => {
      const { data } = await client.query<{ menus: IMenu[] }>({
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

      set({ menu: data.menus.length > 0 ? data.menus[0] : null });
    },
  },
});
