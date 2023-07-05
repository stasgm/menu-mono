import { getCurrentMenu } from './menu';
import { IProductSelection, calculateTotalPrice } from './order';
import { categories, menus, products } from './order.mock';

describe('calculateTotalPrice', () => {
  it('should return 0 for empty order', () => {
    expect(calculateTotalPrice([], { lines: [] })).toBe(0);
  });

  it('should return 0 for order', () => {
    const menu = getCurrentMenu({
      currentDate: new Date(2023, 6, 18),
      categories,
      menus,
      products,
    });

    const productsSelections: IProductSelection[] = [
      {
        id: '1',
        productId: 1,
        quantity: 2,
      },
      {
        id: '2',
        productId: 2,
        quantity: 1,
      },
      {
        id: '3',
        productId: 4,
        quantity: 0,
      },
    ];

    expect(calculateTotalPrice(productsSelections, menu)).toBe(350);
  });
});

describe('getCurrentMenu', () => {
  it('should return menu with 4 lines', () => {
    const menu = getCurrentMenu({
      currentDate: new Date(2023, 6, 18),
      categories,
      menus,
      products,
    });

    expect(typeof menu).toBe('object');
    expect(menu.lines.length).toBe(4);
  });
});
