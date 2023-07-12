import { getCurrentMenu } from './menu';
import { IProductSelections, calculateTotalPrice } from './order';
import { categories, menus, products } from './mocks';

describe('calculateTotalPrice', () => {
  it('should return 0 for empty order', () => {
    expect(calculateTotalPrice({})).toBe(0);
  });

  it('should return 0 for order', () => {
    // const menu = getCurrentMenu({
    //   currentDate: new Date(2023, 6, 18),
    //   categories,
    //   menus,
    //   products,
    // });

    const productsSelections: IProductSelections = {
      '1': {
        quantity: 2,
        price: 100,
      },
      '2': {
        quantity: 1,
        price: 150,
      },
      '3': {
        quantity: 0,
        price: 200,
      },
    };

    expect(calculateTotalPrice(productsSelections)).toBe(350);
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
