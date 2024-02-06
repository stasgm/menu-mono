import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CategoriesSeedService } from './categories/categories-seed.service';
import { CustomersSeedService } from './customers/customers-seed.service';
import { MenusSeedService } from './menu/menus-seed.service';
import { OrdersSeedService } from './orders/orders-seed.service';
import { ProductsSeedService } from './products/products-seed.service';
import { SeedModule } from './seed.module';
import { UsersSeedService } from './users/users-seed.service';

const runSeed = async () => {
  const logger = new Logger('SeedService');

  const app = await NestFactory.create(SeedModule);

  logger.log('🧹 Removing old data...\t');
  // remove old data
  await app.get(OrdersSeedService).removeAll();
  await app.get(UsersSeedService).removeAll();
  await app.get(CustomersSeedService).removeAll();
  await app.get(MenusSeedService).removeAll();
  await app.get(ProductsSeedService).removeAll();
  await app.get(CategoriesSeedService).removeAll();

  logger.log('🌿 Seeding new data...\t');
  // seed new data
  await app.get(CategoriesSeedService).seed();
  await app.get(ProductsSeedService).seed();
  await app.get(MenusSeedService).seed();
  await app.get(CustomersSeedService).seed();
  await app.get(UsersSeedService).seed();
  await app.get(OrdersSeedService).seed();

  logger.log('🏁 Done! \t');

  await app.close();
};

void runSeed();
