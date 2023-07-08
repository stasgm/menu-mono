import { StateCreator } from 'zustand';
import { IOrder, ICustomerDetails, calculateProductsQuantity, calculateTotalPrice } from '@packages/domains';

const getInitialOrder = (): IOrder => {
  return {
    number: 1,
    date: new Date(),
    customerDetails: {
      name: '',
      phoneNumber: '',
    },
    productSelections: {},
    orderLines: [],
    status: 'new',
    totalAmount: 0,
    totalProductQuantity: 0,
  };
};

export interface OrderSlice {
  order: IOrder;
  orderActions: {
    updateCustomerDetails: (customerDetails: ICustomerDetails) => void;
    addProduct: (productId: string) => void;
    removeProduct: (productId: string) => void;
    updateQuantity: (productId: string, action: 'increase' | 'decrease') => void;
    resetOrder: () => void;
    placeOrder: () => void;
  };
}

export const createOrderSlice: StateCreator<OrderSlice> = (set, get) => ({
  order: getInitialOrder(),
  orderActions: {
    updateCustomerDetails: (customerDetails: ICustomerDetails) => {
      const order = get().order;
      order.customerDetails = customerDetails;
      set({ order });
    },
    addProduct: (productId: string) => {
      const order = get().order;
      const findProduct = order.productSelections[productId];
      if (findProduct) {
        findProduct.quantity = findProduct.quantity + 1;
      } else {
        order.productSelections[productId] = { quantity: 1 };
      }
      order.totalProductQuantity = calculateProductsQuantity(order.productSelections);
      // order.totalAmount = calculateTotalPrice(order.productSelections, menu);
      set({ order });
    },
    removeProduct: (productId: string) => {
      const order = get().order;
      delete order.productSelections[productId];
      order.totalProductQuantity = calculateProductsQuantity(order.productSelections);
      set({ order });
    },
    updateQuantity: (productId: string, action: 'increase' | 'decrease') => {
      const order = get().order;
      const findProduct = order.productSelections[productId];

      if (!findProduct) {
        if (action === 'increase') {
          get().orderActions.addProduct(productId);
        }
        return;
      }

      if (action === 'decrease') {
        if (findProduct.quantity > 1) {
          findProduct.quantity = findProduct.quantity - 1;
        } else {
          return get().orderActions.removeProduct(productId);
        }
      } else {
        findProduct.quantity = findProduct.quantity + 1;
      }
      order.totalProductQuantity = calculateProductsQuantity(order.productSelections);
      set({ order });
    },
    resetOrder: () => {
      set({ order: getInitialOrder() });
    },
    placeOrder: async () => {
      console.log('placing an order');
      set({ order: getInitialOrder() });
    },
  },
});
