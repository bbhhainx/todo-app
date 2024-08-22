import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import * as process from 'process';
import { hostname } from 'os';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    // By adding this validation pipe globally, nest js helps us to validate body params, query param etc..
    new ValidationPipe({
      whitelist: true, // When Whitelist is set to true, You will not be allowed to send additional props apart from DTO Property
    }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // await app.listen(5000);
  await app.listen(process.env.PORT, hostname:'0.0.0.0');
}
bootstrap();
