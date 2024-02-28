import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppConfig } from '@/core/config/app-config';
import { PrismaExceptionFilter } from '@/core/persistence/prisma/prisma-exception.filter';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/filters/http-exception-filter';

declare const module: any;

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const appConfig = new AppConfig();

  const { nestPort, isProduction, envPrefix, mail } = appConfig;

  if (!isProduction) {
    logger.debug(`Current environment: ${envPrefix}`);
    logger.debug(`Mailing is ${mail.mockMailing ? 'mocked' : 'enabled'}`);
  }

  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(AppConfig.nestApiGlobalPrefix);
    app.enableCors();

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter), new GlobalExceptionFilter());

    await app.listen(nestPort);

    if (!isProduction && module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    logger.log(`Application is running on: http://localhost:${nestPort}`);
    logger.log(`GraphQL Sandbox: http://localhost:${nestPort}/graphql`);
  } catch (error) {
    logger.error({ err: error });
    throw new Error('error');
  }
}

bootstrap();
