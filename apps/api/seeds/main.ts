import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppConfig } from '@/core/config/app-config';

import { ActivationCodesSeedService } from './activation-codes/activation-codes.service';
import { CategoriesSeedService } from './categories/categories.service';
import { CustomersSeedService } from './customers/customers-seed.service';
import { MenusSeedService } from './menu/menus-seed.service';
import { OrdersSeedService } from './orders/orders-seed.service';
import { ProductsSeedService } from './products/products-seed.service';
import { SeedModule } from './seed.module';
import { UsersSeedService } from './users/users-seed.service';

const services = [
  CategoriesSeedService,
  ProductsSeedService,
  MenusSeedService,
  CustomersSeedService,
  UsersSeedService,
  OrdersSeedService,
  ActivationCodesSeedService,
];

const runSeed = async () => {
  const logger = new Logger('SeedService');
  const appConfig = new AppConfig();

  const app = await NestFactory.create(SeedModule);

  if (!appConfig.isProduction) {
    logger.debug(`Current environment: ${appConfig.envPrefix}`);
  }

  logger.log('');
  logger.log('🚀 -= Seeding =-  🚀');
  logger.log('');

  logger.log('🧹 Removing data in tables:');

  for (const service of [...services].reverse()) {
    await app.get(service).removeAll();
  }

  logger.log('');
  logger.log('🌿 Inserting data into tables:');

  for (const service of services) {
    // insert your code here
    await app.get(service).seed();
  }

  logger.log('🏁 Done! \t');

  await app.close();
};

void runSeed();
