import { IMenuline, IOrderLine } from '@packages/domains';
import { Prisma } from '@prisma/client';

export const connectCategoriesByIds = (
  categories: string[]
): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput => {
  const connectCategories = categories.map((id) => ({ id: id }));

  return {
    connect: connectCategories,
  };
};

export const createMenuLinesByLines = (
  menuLines: IMenuline[]
): Prisma.MenuLineUncheckedCreateNestedManyWithoutMenuInput => {
  const createMenuLines: Prisma.MenuLineUncheckedCreateWithoutMenuInput[] = menuLines.map(
    (menuLine) => {
      return {
        id: menuLine.id,
        price: menuLine.price,
        productId: menuLine.product.id,
      };
    }
  );

  return {
    create: createMenuLines,
  };
};

export const createOrderLinesByLines = (
  orderLines: IOrderLine[]
): Prisma.OrderLineUncheckedCreateNestedManyWithoutOrderInput => {
  const createOrderLines: Prisma.OrderLineUncheckedCreateWithoutOrderInput[] = orderLines.map(
    (line) => {
      return {
        id: line.id,
        price: line.price,
        quantity: line.quantity,
        totalAmount: line.totalAmount,
        productId: line.productId,
      };
    }
  );

  return {
    create: createOrderLines,
  };
};

export const logInfo = (name: string, type: 'SEED' | 'REMOVE' = 'SEED') => {
  // TODO: Use logger
  console.log(`  ${type === 'SEED' ? '🌻' : '🧹'} ${name}`);
}
