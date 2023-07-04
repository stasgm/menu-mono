export type OrderStatusT = 'new' | 'confirmed' | 'rejected';

export interface IOrder {
  id: string;
  number: number;
  date: Date;
  customerDetails: {
    name: string;
    phoneNumber: string;
  };
  totalAmount: number;
  productSelections: IProductSelection[];
  orderLines: IOrderLine[];
  status: OrderStatusT;
}

export interface IOrderLine {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface IProductSelection {
  id: string;
  productId: number;
  quantity: number;
}

export interface IMenuline {
  id: number;
  product: {
    id: number;
    name: string;
    categories: ICategory[];
  };
  price: number;
}

export interface IMenulineData {
  id: number;
  productId: number;
  price: number;
}

export interface IMenuData {
  name: string;
  fromDate: Date;
  toDate: Date;
  lines: IMenulineData[];
}

export interface IMenu {
  lines: IMenuline[];
}

export interface IProductData {
  id: number;
  name: string;
  categories: number[];
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  categories: ICategory[];
}

export interface IGenerateMenuData {
  currentDate: Date;
  categories: ICategory[];
  products: IProductData[];
  menus: IMenuData[];
}
