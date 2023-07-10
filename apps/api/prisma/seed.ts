import { Prisma, PrismaClient } from '@prisma/client';

import { IMenuline, menu, categories, products } from '@packages/domains';

const prisma = new PrismaClient();

const connectCategoriesByIds = (
  categories: string[],
): Prisma.CategoryUncheckedCreateNestedManyWithoutProductsInput => {
  const connectCategories = categories.map((id) => ({ id: +id }));

  return {
    connect: connectCategories,
  };
};

// const connectProductById = (
//   productId: string,
// ): Prisma.ProductCreateWithoutMenuLineInput => {
//   return {
//     connect: {
//       id: +productId,
//     },
//   };
// };

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

  for await (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
      },
    });
  }

  for await (const product of products) {
    const categories = connectCategoriesByIds(product.categories);

    await prisma.product.create({
      data: {
        name: product.name,
        categories,
      },
    });
  }

  const lines = createMenuLinesByLines(menu.lines);

  await prisma.menu.create({
    data: {
      name: 'Current menu',
      lines,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
