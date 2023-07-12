import { ICustomerDetails, IMenuline, IOrderLine } from '@packages/domains';
import {
  categoriesMock,
  menuMock,
  ordersMock,
  productsMock,
} from '@packages/mocks';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectCategoriesByIds = (
  categories: string[],
): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput => {
  const connectCategories = categories.map((id) => ({ id: +id }));

  return {
    connect: connectCategories,
  };
};

const createMenuLinesByLines = (
  menuLines: IMenuline[],
): Prisma.MenuLineUncheckedCreateNestedManyWithoutMenuInput => {
  const createMenuLines: Prisma.MenuLineUncheckedCreateWithoutMenuInput[] =
    menuLines.map((menuLine) => {
      return {
        price: menuLine.price,
        productId: +menuLine.product.id,
      };
    });

  return {
    create: createMenuLines,
  };
};

const createOrderLinesByLines = (
  orderLines: IOrderLine[],
): Prisma.OrderLineUncheckedCreateNestedManyWithoutOrderInput => {
  const createOrderLines: Prisma.OrderLineUncheckedCreateWithoutOrderInput[] =
    orderLines.map((line) => {
      return {
        price: line.price,
        quantity: line.quantity,
        totalAmount: line.totalAmount,
        productId: +line.productId,
      };
    });

  return {
    create: createOrderLines,
  };
};

const getUserId = async (customerDetails: ICustomerDetails) => {
  const user = await (async () => {
    const existingUser = await prisma.user.findFirst({
      where: {
        phoneNumber: customerDetails.phoneNumber,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    return await prisma.user.create({
      data: {
        name: customerDetails.name,
        phoneNumber: customerDetails.phoneNumber,
      },
    });
  })();

  return user.id;
};

async function main() {
  await prisma.orderLine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuLine.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.category.deleteMany();
  await prisma.product.deleteMany();

  console.log('Seeding...');

  for await (const category of categoriesMock) {
    await prisma.category.create({
      data: {
        id: +category.id,
        name: category.name,
      },
    });
  }

  for await (const product of productsMock) {
    const categories = connectCategoriesByIds(product.categories);

    await prisma.product.create({
      data: {
        id: +product.id,
        name: product.name,
        categories,
      },
    });
  }

  const lines = createMenuLinesByLines(menuMock.lines);

  await prisma.menu.create({
    data: {
      name: 'Current menu',
      lines,
    },
  });

  for await (const order of ordersMock) {
    const userId = await getUserId(order.customerDetails);

    await prisma.order.create({
      data: {
        date: new Date(order.date),
        status: order.status,
        number: order.number,
        userId,
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
