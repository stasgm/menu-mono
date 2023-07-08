import { StateCreator } from 'zustand';
import { IMenu } from '@packages/domains';

import { initialMenu } from '@/mockData';

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
      await delay(500);
      set({ menu: initialMenu });
    },
  },
});
