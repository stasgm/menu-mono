import { StateCreator } from 'zustand';
import {
  IOrder,
  ICustomerDetails,
  calculateProductsQuantity,
  calculateTotalPrice,
  IMenuline,
  generateOrderLines,
} from '@packages/domains';
import { gql } from '@apollo/client';

import client from '../../../utils/apollo-client';

const getInitialOrder = (): IOrder => {
  return {
    id: '1',
    number: '1',
    date: new Date().toDateString(),
    customerDetails: {
      name: '',
      phoneNumber: '',
    },
    productSelections: {},
    orderLines: [],
    status: 'NEW',
    totalAmount: 0,
    totalProductQuantity: 0,
  };
};

interface ICreateOrderLineInput {
  id: number;
  price: number;
  quantity: number;
  totalAmount: number;
  productId: number;
}

interface ICreateOrderInput {
  id: number;
  date: string;
  number: string;
  status: string;
  userName: string;
  userPhone: string;
  lines: ICreateOrderLineInput[];
}

export type OrderSlice = State & { orderActions: Actions };

interface State {
  order: IOrder;
}

interface Actions {
  updateCustomerDetails: (customerDetails: ICustomerDetails) => void;
  addProduct: (menuLine: IMenuline) => void;
  removeProduct: (menuLine: IMenuline) => void;
  updateQuantity: (pmenuLine: IMenuline, action: 'increase' | 'decrease') => void;
  resetOrder: () => void;
  placeOrder: () => void;
}

export const createOrderSlice: StateCreator<OrderSlice> = (set, get) => ({
  order: getInitialOrder(),
  orderActions: {
    updateCustomerDetails: (customerDetails: ICustomerDetails) => {
      const order = get().order;
      order.customerDetails = customerDetails;
      set({ order });
    },
    addProduct: (menuLine: IMenuline) => {
      const order = get().order;
      const findProduct = order.productSelections[menuLine.product.id];
      if (findProduct) {
        findProduct.quantity = findProduct.quantity + 1;
      } else {
        order.productSelections[menuLine.product.id] = { quantity: 1, price: menuLine.price };
      }
      order.orderLines = generateOrderLines(order.productSelections);
      order.totalProductQuantity = calculateProductsQuantity(order.productSelections);
      order.totalAmount = calculateTotalPrice(order.productSelections);
      set({ order });
    },
    removeProduct: (menuLine: IMenuline) => {
      const order = get().order;
      delete order.productSelections[menuLine.product.id];
      order.orderLines = generateOrderLines(order.productSelections);
      order.totalProductQuantity = calculateProductsQuantity(order.productSelections);
      order.totalAmount = calculateTotalPrice(order.productSelections);
      set({ order });
    },
    updateQuantity: (menuLine: IMenuline, action: 'increase' | 'decrease') => {
      const order = get().order;
      const findProduct = order.productSelections[menuLine.product.id];

      if (!findProduct) {
        if (action === 'increase') {
          get().orderActions.addProduct(menuLine);
        }
        return;
      }

      if (action === 'decrease') {
        if (findProduct.quantity > 1) {
          findProduct.quantity = findProduct.quantity - 1;
        } else {
          return get().orderActions.removeProduct(menuLine);
        }
      } else {
        findProduct.quantity = findProduct.quantity + 1;
      }
      order.orderLines = generateOrderLines(order.productSelections);
      order.totalProductQuantity = calculateProductsQuantity(order.productSelections);
      order.totalAmount = calculateTotalPrice(order.productSelections);
      set({ order });
    },
    resetOrder: () => {
      set({ order: getInitialOrder() });
    },
    placeOrder: async () => {
      console.log('placing the order');

      const order = get().order;

      const mutateQuery = gql`
        mutation CreateOrder($createOrderInput: CreateOrderInput!) {
          createOrder(createOrderInput: $createOrderInput) {
            id
          }
        }
      `;

      const data: ICreateOrderInput = {
        date: order.date,
        id: +order.id,
        lines: order.orderLines.map((line) => ({
          id: +line.id,
          price: line.price,
          productId: +line.productId,
          quantity: line.quantity,
          totalAmount: line.totalAmount,
        })),
        number: order.number,
        status: order.status,
        userName: order.customerDetails.name,
        userPhone: order.customerDetails.phoneNumber,
      };

      const response = await client.mutate({
        mutation: mutateQuery,
        variables: {
          createOrderInput: data,
        },
      });

      console.log(`result: ${JSON.stringify(response)}`);

      set({ order: getInitialOrder() });
    },
  },
});
