import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { AppConfig } from '@/core/config/app-config';

@Injectable()
export class GraphqlTestConfigService implements GqlOptionsFactory {
  constructor(private readonly appConfig: AppConfig) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: true,
      context: ({ req }: { req: any }) => ({ req }),
    };
  }
}
