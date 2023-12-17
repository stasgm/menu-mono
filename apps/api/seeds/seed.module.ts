import { Module } from '@nestjs/common';

import { CategoriesSeedModule } from './categories/categories-seed.module';
import { CustomersSeedModule } from './customers/customers-seed.module';
import { MenusSeedModule } from './menu/menus-seed.module';
import { OrdersSeedModule } from './orders/orders-seed.module';
import { ProductsSeedModule } from './products/products-seed.module';
import { UsersSeedModule } from './users/users-seed.module';

@Module({
  imports: [
    UsersSeedModule,
    CustomersSeedModule,
    OrdersSeedModule,
    ProductsSeedModule,
    CategoriesSeedModule,
    MenusSeedModule,
  ],
})
export class SeedModule {}
