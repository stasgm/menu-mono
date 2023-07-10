import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { validationSchemaForEnv } from './config/environment-variables';
import { PersistenceModule } from './modules/_core/persistence/persistence.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MenusModule } from './modules/menus/menus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (configuration: Record<string, unknown>) => {
        return validationSchemaForEnv.parse(configuration);
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PersistenceModule,
    ProductsModule,
    CategoriesModule,
    MenusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
