// import { gql } from '@apollo/client';
import { IOrder } from '@packages/domains';
import { ordersMock } from '@packages/mocks';
import { StateCreator } from 'zustand';

import { ILoadingState } from '../types';
// import { getOrders } from '@/graphql/orders';
// import client from '@/utils/apollo-client';

export type OrdersSlice = State & ILoadingState & { ordersActions: Actions };

interface State {
  orders: IOrder[];
}

interface Actions {}

export const createOrdersSlice: StateCreator<OrdersSlice> = (set) => ({
  orders: [],
  error: null,
  isLoading: false,
  // query: { page: 1, per_page: 20 },
  ordersActions: {
    fetchProducts: () => {
      set(() => ({
        isLoading: true,
        error: '',
      }));

      const orders: IOrder[] = ordersMock;
      // const { data } = await client.query<{ orders: IOrder[] }>({
      //   query: getOrders,
      // });
      // const orders = data.orders;

      set(() => ({
        isLoading: false,
        error: '',
        orders,
      }));
    },
  },
});
