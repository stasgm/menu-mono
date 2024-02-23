import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppConfig } from '@/core/config/app-config';
import { PrismaExceptionFilter } from '@/core/persistence/prisma/prisma-exception.filter';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/filters/http-exception-filter';

declare const module: any;
async function bootstrap() {
  const logger = new Logger('EntryPoint');
  const appConfig = new AppConfig();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(AppConfig.nestApiGlobalPrefix);
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new GlobalExceptionFilter(), new PrismaClientExceptionFilter());
  app.useGlobalFilters(new GlobalExceptionFilter(), new PrismaExceptionFilter(httpAdapter));

  const PORT = appConfig.nestPort;

  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  if (!appConfig.isProduction) {
    logger.debug(`Current environment: ${appConfig.envPrefix}`);
    logger.debug(`Mailing is ${appConfig.mail.mockMailing ? 'mocked' : 'enabled'}`);
  }

  logger.log(`Application is running on: http://localhost:${PORT}`);
  logger.log(`GraphQL Sandbox: http://localhost:${PORT}/graphql`);
}

bootstrap();
