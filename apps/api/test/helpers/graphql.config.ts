import { join } from 'node:path';
import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { AppConfig } from '@/core/config/app-config';
import { ApolloDriverConfig } from '@nestjs/apollo';

@Injectable()
export class GraphqlTestConfigService implements GqlOptionsFactory {
  constructor(private readonly appConfig: AppConfig) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
      context: ({ req }: { req: any }) => ({ req }),
    };
  }

  // createGqlOptions(): ApolloDriverConfig {
  //   return {
  //     // formatError: (formattedError, error) => this.formatError(formattedError, error),
  //     autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
  //     sortSchema: true,
  //     playground: false,
  //     includeStacktraceInErrorResponses: !this.appConfig.isProduction,
  //   };
  // }
}
