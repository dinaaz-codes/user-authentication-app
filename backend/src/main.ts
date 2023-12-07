import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfigurations } from './config/swagger.config';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  const document = SwaggerModule.createDocument(
    app,
    getSwaggerConfigurations(),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
