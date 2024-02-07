import { Module } from '@nestjs/common';

import { ActivationCodesSeedModule } from './activation-codes/activation-codes.module';
import { CategoriesSeedModule } from './categories/categories.module';
import { CustomersSeedModule } from './customers/customers-seed.module';
import { MenusSeedModule } from './menu/menus-seed.module';
import { OrdersSeedModule } from './orders/orders-seed.module';
import { ProductsSeedModule } from './products/products-seed.module';
import { UsersSeedModule } from './users/users-seed.module';

@Module({
  imports: [
    ActivationCodesSeedModule,
    UsersSeedModule,
    CustomersSeedModule,
    OrdersSeedModule,
    ProductsSeedModule,
    CategoriesSeedModule,
    MenusSeedModule,
  ],
})
export class SeedModule {}
