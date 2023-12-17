import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppConfig } from '@/core/config/app-config';
import { PrismaClientExceptionFilter } from '@/core/persistence/prisma/prisma-client-exception.filter';

import { AppModule } from './app.module';

declare const module: any;
async function bootstrap() {
  const logger = new Logger('EntryPoint');
  const appConfig = new AppConfig();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(AppConfig.nestApiGlobalPrefix);
  app.enableCors();

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  const PORT = appConfig.nestPort;

  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  logger.log(`Application is running on: http://localhost:${PORT}`);
  logger.log(`GraphQL Sandbox: http://localhost:${PORT}/graphql`);
}
bootstrap();
