// import { gql } from '@apollo/client';
import { IMenu } from '@packages/domains';
import { StateCreator } from 'zustand';

// import client from '@/utils/apollo-client';
import { ILoadingState } from '../types';

export type MenusSlice = State & ILoadingState & { menusActions: Actions };

// interface IMenu {
//   id: string;
//   number: number;
// }

interface State {
  menus: IMenu[];
}

interface Actions {
  fetchMenus: () => void;
}

export const createMenusSlice: StateCreator<MenusSlice> = (set) => ({
  menus: [],
  error: null,
  isLoading: false,
  menusActions: {
    fetchMenus: () => {
      set({ isLoading: true });
    },
  },
});
