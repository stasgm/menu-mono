// import { join } from 'node:path';

// import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { HttpException, Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// import { DirectiveLocation, GraphQLDirective, GraphQLError } from 'graphql';
import { GraphqlConfigService } from '@/core/config/graphql-config';
// import { upperDirectiveTransformer } from '@/core/directives/upper-case.directive';
import { HealthModule } from '@/core/health/health.module';
import { PersistenceModule } from '@/core/persistence/persistence.module';
import { SchedulersModule } from '@/core/schedulers/shcedulers.module';
import { ActivationCodesModule } from '@/modules/activation-codes/activation-codes.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { CustomersModule } from '@/modules/customers/customers.module';
import { MailModule } from '@/modules/mail/mail.module';
import { MenusModule } from '@/modules/menus/menus.module';
// import { OrdersModule } from '@/modules/orders/orders.module';
import { ProductsModule } from '@/modules/products/products.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [
    // TODO: Move gql config to a separate file
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphqlConfigService,
      // imports: [AppConfigModule]
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   formatError(formattedError, error) {
    //     if (error instanceof GraphQLError) {
    //       return {
    //         message: error.message,
    //         name: formattedError.extensions?.code,
    //         code: formattedError.extensions?.status || 500,
    //       };
    //     } else if (error instanceof HttpException) {
    //       return {
    //         message: error.message,
    //         name: error.name,
    //         code: 500,
    //       };
    //     }
    //     return formattedError;
    //   },
    //   autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
    //   sortSchema: true,
    //   // typePaths: ['./**/*.graphql'],
    //   transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
    //   installSubscriptionHandlers: true,
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   includeStacktraceInErrorResponses: process.env.NODE_ENV === 'development',
    //   buildSchemaOptions: {
    //     // dateScalarMode: 'timestamp',
    //     directives: [
    //       new GraphQLDirective({
    //         name: 'upper',
    //         locations: [DirectiveLocation.FIELD_DEFINITION],
    //       }),
    //     ],
    //   },
    // }),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
