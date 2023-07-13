import { getMenu, IMenuline, IOrderLine } from '@packages/domains';
import { categoriesMock, menusMock, ordersMock, productsMock, usersMock } from '@packages/mocks';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectCategoriesByIds = (
  categories: string[],
): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput => {
  const connectCategories = categories.map((id) => ({ id: id }));

  return {
    connect: connectCategories,
  };
};

const createMenuLinesByLines = (
  menuLines: IMenuline[],
): Prisma.MenuLineUncheckedCreateNestedManyWithoutMenuInput => {
  const createMenuLines: Prisma.MenuLineUncheckedCreateWithoutMenuInput[] = menuLines.map(
    (menuLine) => {
      return {
        id: menuLine.id,
        price: menuLine.price,
        productId: menuLine.product.id,
      };
    },
  );

  return {
    create: createMenuLines,
  };
};

const createOrderLinesByLines = (
  orderLines: IOrderLine[],
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
    },
  );

  return {
    create: createOrderLines,
  };
};

async function main() {
  await prisma.orderLine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuLine.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.category.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('🌿 Seeding...\t');

  console.log('  🌻 users');

  for await (const user of usersMock) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
    });
  }

  console.log('  🌻 product categories');

  for await (const category of categoriesMock) {
    await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
      },
    });
  }

  console.log('  🌻 products');

  for await (const product of productsMock) {
    const categories = connectCategoriesByIds(product.categories);

    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        categories,
      },
    });
  }

  console.log('  🌻 menus');

  for await (const menu of menusMock) {
    await prisma.menu.create({
      data: {
        id: menu.id,
        number: menu.number,
        name: menu.name,
        lines: createMenuLinesByLines(getMenu(menu, productsMock, categoriesMock).lines),
      },
    });
  }

  console.log('  🌻 orders');

  for await (const order of ordersMock) {
    await prisma.order.create({
      data: {
        id: order.id,
        date: new Date(order.date),
        userId: order.userId,
        totalAmount: order.totalAmount,
        totalProductQuantity: order.totalProductQuantity,
        lines: createOrderLinesByLines(order.orderLines),
      },
    });
  }
}

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
