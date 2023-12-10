import { DocumentBuilder } from '@nestjs/swagger';

export const API_TAGS = {
  health: 'Ping',
  auth: 'Authentication',
  greeting: 'Greetings',
};

export const SWAGGER_CONFIGS = {
  title: 'EasyGenerator Task Api',
  version: '1.0',
  description:
    'Consists of apis responsible for carrying out user sign up and sign in',
};

export const getSwaggerConfigurations = () => {
  return new DocumentBuilder()
    .setTitle(SWAGGER_CONFIGS.title)
    .setDescription(SWAGGER_CONFIGS.description)
    .setVersion(SWAGGER_CONFIGS.version)
    .addTag(API_TAGS.health)
    .addTag(API_TAGS.auth)
    .addTag(API_TAGS.greeting)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter Access Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addCookieAuth(
      'authCookie',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'in-app-cookie-refresh_token',
    )
    .build();
};
