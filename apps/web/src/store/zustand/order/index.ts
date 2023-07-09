import { StateCreator } from 'zustand';
import { IOrder, ICustomerDetails, calculateProductsQuantity, calculateTotalPrice, IMenuline } from '@packages/domains';

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
      order.totalProductQuantity = calculateProductsQuantity(order.productSelections);
      order.totalAmount = calculateTotalPrice(order.productSelections);
      set({ order });
    },
    removeProduct: (menuLine: IMenuline) => {
      const order = get().order;
      delete order.productSelections[menuLine.product.id];
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
      order.totalProductQuantity = calculateProductsQuantity(order.productSelections);
      order.totalAmount = calculateTotalPrice(order.productSelections);
      set({ order });
    },
    resetOrder: () => {
      set({ order: getInitialOrder() });
    },
    placeOrder: async () => {
      console.log('placing the order');
      set({ order: getInitialOrder() });
    },
  },
});
