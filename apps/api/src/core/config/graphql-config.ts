import { join } from 'node:path';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { HttpException, Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective, GraphQLError, GraphQLFormattedError } from 'graphql';

import { AppConfig } from '@/core/config/app-config';

import { upperDirectiveTransformer } from '../directives/upper-case.directive';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  private readonly appConfig = new AppConfig();
  // constructor(private readonly appConfig: AppConfig) {}

  private formatError(formattedError: GraphQLFormattedError, error: unknown) {
    const message = formattedError.message.replace('Validation error: ', '').replace('GraphQL error: ', '');
    const name = formattedError.extensions?.code
    const originalError = formattedError?.extensions?.originalError as Record<string, unknown>;

    const code = originalError?.statusCode ?? formattedError.extensions?.status ?? 500;

    if (error instanceof GraphQLError) {
      return {
        message,
        name,
        code
      };
    } else if (error instanceof HttpException) {
      return {
        message: error.message,
        name: error.name,
        code: 500,
      };
    }

    return formattedError;
  }

  createGqlOptions(): ApolloDriverConfig {
    return {
      formatError: (formattedError, error) => this.formatError(formattedError, error),
      autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
      // sortSchema: true,
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      // installSubscriptionHandlers: true,
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
    };
  }
}
