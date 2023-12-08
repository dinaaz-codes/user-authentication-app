import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { GreetingModule } from './greeting/greeting.module';

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
      }),
      isGlobal: true,
    }),
    DatabaseModule,
    HealthModule,
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: <string>configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
    }),
    GreetingModule,
  ],
})
export class AppModule {}
