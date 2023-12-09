import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GreetingModule } from './greeting/greeting.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        APP_ENV: Joi.string().default('test'),
        PORT: Joi.number().default(3000),
        MONGO_URL: Joi.string().required(),
        MONGO_TEST_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_RT_SECRET: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    DatabaseModule,
    HealthModule,
    UserModule,
    AuthModule,
    GreetingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
