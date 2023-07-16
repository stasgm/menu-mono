// import { gql } from '@apollo/client';
// import { } from '@packages/domains';
import { StateCreator } from 'zustand';

import { ILoadingState } from '../types';

// import client from '@/utils/apollo-client';

export type OrdersSlice = State & ILoadingState & { ordersAtions: Actions };

interface IOrder {
  id: string;
  number: number;
}

interface State {
  orders: IOrder[];
}

interface Actions {}

export const createOrdersSlice: StateCreator<OrdersSlice> = (set) => ({
  orders: [],
  error: null,
  isLoading: false,
  ordersAtions: {
    fetchOrders: () => {
      set({ isLoading: true });
    },
  },
});