import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppConfigModule } from '@/core/config/app-config.module';
import { GraphqlConfigService } from '@/core/graphql/graphql-config';
import { HealthModule } from '@/core/health/health.module';
import { PersistenceModule } from '@/core/persistence/persistence.module';
import { SchedulersModule } from '@/core/schedulers/shcedulers.module';
import { ActivationCodesModule } from '@/modules/auth/activation-codes/activation-codes.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { TokensModule } from '@/modules/auth/tokens/tokens.module';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { CustomersModule } from '@/modules/customers/customers.module';
import { MailModule } from '@/modules/mail/mail.module';
import { MenusModule } from '@/modules/menus/menus.module';
// import { OrdersModule } from '@/modules/orders/orders.module';
import { ProductsModule } from '@/modules/products/products.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphqlConfigService,
      imports: [AppConfigModule],
    }),
    AppConfigModule,
    SchedulersModule,
    HealthModule,
    MailModule,
    AuthModule,
    PersistenceModule,
    ProductsModule,
    CategoriesModule,
    MenusModule,
    // OrdersModule,
    UsersModule,
    CustomersModule,
    ActivationCodesModule,
    TokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
