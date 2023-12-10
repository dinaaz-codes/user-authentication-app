import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfigurations } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import * as cookieParser from 'cookie-parser';
import { corsConfigs } from './config/cors.config';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionFilter());

  app.enableCors(corsConfigs());

  const document = SwaggerModule.createDocument(
    app,
    getSwaggerConfigurations(),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
