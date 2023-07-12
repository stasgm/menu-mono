import { IMenuline } from '@packages/domains';
import { categoriesMock, menuMock, productsMock } from '@packages/mocks';
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
  const connectMenuLines: Prisma.MenuLineUncheckedCreateWithoutMenuInput[] =
    menuLines.map((menuLine) => {
      return {
        price: menuLine.price,
        productId: +menuLine.product.id,
      };
    });

  return {
    create: connectMenuLines,
  };
};

async function main() {
  await prisma.menu.deleteMany();
  await prisma.category.deleteMany();
  await prisma.product.deleteMany();

  console.log('Seeding...');

  for await (const category of categoriesMock) {
    await prisma.category.create({
      data: {
        name: category.name,
      },
    });
  }

  for await (const product of productsMock) {
    const categories = connectCategoriesByIds(product.categories);

    await prisma.product.create({
      data: {
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
}

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
