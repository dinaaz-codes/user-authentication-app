import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
      }),
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
