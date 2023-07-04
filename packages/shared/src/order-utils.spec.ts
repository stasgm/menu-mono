import { calculateTotalPrice, getCurrentMenu } from './order-utils';
import { categories, menus, products } from './order-utils.mock';

describe('calculateTotalPrice', () => {
  it('should return 0 for empty order', () => {
    expect(calculateTotalPrice([], { lines: [] })).toBe(0);
  });
});

describe('getCurrentMenu', () => {
  it('should return 0', () => {
    const menu = getCurrentMenu({
      currentDate: new Date(2023, 7, 18),
      categories,
      menus,
      products,
    });

    expect(typeof menu).toBe('object');
  });
});
