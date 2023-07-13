import { ICategory, ICategoryData } from './category';
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
  id: string;
  name: string;
  number: number;
  fromDate: Date;
  toDate: Date;
  lines: IMenulineData[];
}

export interface IMenu {
  id: string;
  name: string;
  number: number;
  lines: IMenuline[];
}

export interface IGenerateMenuData {
  currentDate: Date;
  categories: ICategory[];
  products: IProductData[];
  menus: IMenuData[];
}

/**
 * Get menu
 */
export const getMenu = (
  menuData: IMenuData,
  productsData: IProductData[],
  categoriesData: ICategoryData[],
): IMenu => {
  const menuLines: IMenuline[] = menuData.lines.map((el) => {
    const product: IProduct | undefined = getProduct(productsData, categoriesData, el.productId);

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
    id: menuData.id,
    number: menuData.number,
    name: menuData.name,
    lines: menuLines,
  };
};

/**
 * get on active menu
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

  return getMenu(activeMenu, generateMenuData.products, generateMenuData.categories);
};
