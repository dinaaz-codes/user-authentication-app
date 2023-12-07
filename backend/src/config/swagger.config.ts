import { DocumentBuilder } from '@nestjs/swagger';

export const API_TAGS = {
  health: 'Ping',
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
    .build();
};
