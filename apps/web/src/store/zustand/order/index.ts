import { StateCreator } from 'zustand';
import {
  IUserData,
  calculateProductsQuantity,
  calculateTotalPrice,
  IMenuline,
  generateOrderLines,
  ICart,
} from '@packages/domains';
import { gql } from '@apollo/client';

import client from '../../../utils/apollo-client';

const getInitialCart = (): ICart => {
  return {
    date: new Date().toDateString(),
    userData: {
      name: '',
      phoneNumber: '',
    },
    productSelections: {},
    lines: [],
    totalAmount: 0,
    totalProductQuantity: 0,
  };
};

interface ICreateCartLineInput {
  productId: string;
  price: number;
  quantity: number;
}

interface ICreateOrderInput {
  date: string;
  userName: string;
  userPhone: string;
  lines: ICreateCartLineInput[];
}

export type CartSlice = State & { cartActions: Actions };

interface State {
  cart: ICart;
}

interface Actions {
  updateUserData: (userData: IUserData) => void;
  addProduct: (menuLine: IMenuline) => void;
  removeProduct: (menuLine: IMenuline) => void;
  updateQuantity: (pmenuLine: IMenuline, action: 'increase' | 'decrease') => void;
  resetCart: () => void;
  placeOrder: () => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  cart: getInitialCart(),
  cartActions: {
    updateUserData: (userData: IUserData) => {
      const cart = get().cart;
      cart.userData = userData;
      set({ cart });
    },
    addProduct: (menuLine: IMenuline) => {
      const cart = get().cart;
      const findProduct = cart.productSelections[menuLine.product.id];
      if (findProduct) {
        findProduct.quantity = findProduct.quantity + 1;
      } else {
        cart.productSelections[menuLine.product.id] = { quantity: 1, price: menuLine.price };
      }
      cart.lines = generateOrderLines(cart.productSelections);
      cart.totalProductQuantity = calculateProductsQuantity(cart.productSelections);
      cart.totalAmount = calculateTotalPrice(cart.productSelections);
      set({ cart });
    },
    removeProduct: (menuLine: IMenuline) => {
      const cart = get().cart;
      delete cart.productSelections[menuLine.product.id];
      cart.lines = generateOrderLines(cart.productSelections);
      cart.totalProductQuantity = calculateProductsQuantity(cart.productSelections);
      cart.totalAmount = calculateTotalPrice(cart.productSelections);
      set({ cart });
    },
    updateQuantity: (menuLine: IMenuline, action: 'increase' | 'decrease') => {
      const cart = get().cart;
      const findProduct = cart.productSelections[menuLine.product.id];

      if (!findProduct) {
        if (action === 'increase') {
          get().cartActions.addProduct(menuLine);
        }
        return;
      }

      if (action === 'decrease') {
        if (findProduct.quantity > 1) {
          findProduct.quantity = findProduct.quantity - 1;
        } else {
          return get().cartActions.removeProduct(menuLine);
        }
      } else {
        findProduct.quantity = findProduct.quantity + 1;
      }
      cart.lines = generateOrderLines(cart.productSelections);
      cart.totalProductQuantity = calculateProductsQuantity(cart.productSelections);
      cart.totalAmount = calculateTotalPrice(cart.productSelections);

      set({ cart });
    },
    resetCart: () => {
      set({ cart: getInitialCart() });
    },
    placeOrder: async () => {
      console.log('placing the order');

      const cart = get().cart;

      const mutateQuery = gql`
        mutation CreateOrder($createOrderInput: CreateOrderInput!) {
          createOrder(createOrderInput: $createOrderInput) {
            id
          }
        }
      `;

      const data: ICreateOrderInput = {
        date: cart.date,
        lines: cart.lines.map((line) => ({
          productId: line.productId,
          price: line.price,
          quantity: line.quantity,
        })),
        userName: cart.userData.name,
        userPhone: cart.userData.phoneNumber,
      };

      const response = await client.mutate({
        mutation: mutateQuery,
        variables: {
          createOrderInput: data,
        },
      });

      console.log(`result: ${JSON.stringify(response)}`);

      set({ cart: getInitialCart() });
    },
  },
});
