import { join } from 'node:path';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpException, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective, GraphQLError } from 'graphql';

import { upperDirectiveTransformer } from './core/directives/upper-case.directive';
// import { validationSchemaForEnv as validationSchemaForEnvironment } from './config/environment-variables';
import { PersistenceModule } from './core/persistence/persistence.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CustomersModule } from './modules/customers/customers.module';
// import { MenusModule } from './modules/menus/menus.module';
// import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
// import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validate: (configuration: Record<string, unknown>) => {
      //   return validationSchemaForEnvironment.parse(configuration);
      // },
    }),
    // TODO: Move gql config to a separate file
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      formatError(formattedError, error) {
        if (error instanceof GraphQLError) {
          return {
            message: error.message,
            name: formattedError.extensions?.code,
            code: formattedError.extensions?.status || 500,
          };
        } else if (error instanceof HttpException) {
          return {
            message: error.message,
            name: error.name,
            code: 500,
          };
        }

        return formattedError;
      },
      autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
      sortSchema: true,
      // typePaths: ['./**/*.graphql'],
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      includeStacktraceInErrorResponses: process.env.NODE_ENV === 'development',
      buildSchemaOptions: {
        // dateScalarMode: 'timestamp',
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    AuthModule,
    PersistenceModule,
    ProductsModule,
    CategoriesModule,
    // MenusModule,
    // OrdersModule,
    // UsersModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
