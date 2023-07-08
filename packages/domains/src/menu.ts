import { ICategory } from './category';
import { IProductData, IProduct, getProduct } from './product';

export interface IMenuline {
  id: string;
  product: {
    id: string;
    name: string;
    categories: ICategory[];
  };
  price: number;
}

export interface IMenulineData {
  id: string;
  productId: string;
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

export interface IGenerateMenuData {
  currentDate: Date;
  categories: ICategory[];
  products: IProductData[];
  menus: IMenuData[];
}

/**
 * Generates a menu
 */
export const getCurrentMenu = (generateMenuData: IGenerateMenuData): IMenu => {
  const activeMenus = generateMenuData.menus.filter((el) => {
    return (
      el.fromDate.getTime() <= generateMenuData.currentDate.getTime() &&
      el.toDate.getTime() >= generateMenuData.currentDate.getTime()
    );
  });

  if (!activeMenus.length) {
    throw new Error('No active menu');
  }

  // TODO: Sort menus by date
  const activeMenu = activeMenus[0];

  const menuLines: IMenuline[] = activeMenu.lines.map((el) => {
    const product: IProduct | undefined = getProduct(
      generateMenuData.products,
      generateMenuData.categories,
      el.productId,
    );

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      id: el.id,
      price: el.price,
      product,
    };
  });

  return {
    lines: menuLines,
  };
};
