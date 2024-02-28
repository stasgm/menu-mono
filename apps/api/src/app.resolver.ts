import { Query, Resolver } from '@nestjs/graphql';

import { AppConfig } from './core/config/app-config';

@Resolver()
export class AppResolver {
  @Query(() => String)
  apiVersion(): string {
    return AppConfig.nestApiGlobalPrefix;
  }
}
