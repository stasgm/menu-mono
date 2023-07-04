import {
  ICategory,
  IGenerateMenuData,
  IMenu,
  IMenuline,
  IProduct,
  IProductData,
  IProductSelection,
} from './order-types';

const getProduct = (products: IProductData[], categories: ICategory[], productId: number): IProduct => {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const productCategories: ICategory[] = product.categories.map((categoryId) => getCategory(categories, categoryId));

  return { ...product, categories: productCategories };
};

const getCategory = (categories: ICategory[], categoryId: number): ICategory => {
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};

/**
 * Generates a menu structure
 */
export const getCurrentMenu = (generateMenuData: IGenerateMenuData): IMenu => {
  const activeMenus = generateMenuData.menus.filter((el) => {
    return (
      el.fromDate.getTime() >= generateMenuData.currentDate.getTime() &&
      el.toDate.getTime() <= generateMenuData.currentDate.getTime()
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

/**
 * Calculate the total price of the order
 */
export const calculateTotalPrice = (productsSelections: IProductSelection[], menu: IMenu): number => {
  return productsSelections.reduce((acc, cur) => {
    const menuLine = menu.lines.find((el) => el.product.id === cur.productId);

    return acc + (menuLine ? cur.quantity * menuLine.price : 0);
  }, 0);
};
