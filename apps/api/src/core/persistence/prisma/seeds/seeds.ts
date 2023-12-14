import { NestFactory } from '@nestjs/core';

import { CategoriesSeedService } from './categories/categories-seed.service';
import { CustomersSeedService } from './customers/customers-seed.service';
import { MenusSeedService } from './menu/menus-seed.service';
import { OrdersSeedService } from './orders/orders-seed.service';
import { ProductsSeedService } from './products/products-seed.service';
import { SeedModule } from './seed.module';
import { UsersSeedService } from './users/users-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  console.log('🌿 Seeding...\t');

  // remove old data
  await app.get(OrdersSeedService).removeAll();
  await app.get(MenusSeedService).removeAll();
  await app.get(ProductsSeedService).removeAll();
  await app.get(CategoriesSeedService).removeAll();
  await app.get(CustomersSeedService).removeAll();
  await app.get(UsersSeedService).removeAll();

  // seed new data
  await app.get(CategoriesSeedService).seed();
  await app.get(ProductsSeedService).seed();
  await app.get(CustomersSeedService).seed();
  await app.get(UsersSeedService).seed();
  await app.get(MenusSeedService).seed();
  await app.get(OrdersSeedService).seed();

  console.log('🌿 Done! \t');
  await app.close();
};

void runSeed();
