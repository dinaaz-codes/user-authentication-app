import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const MongooseConfigs = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const dbLogger = new Logger('MongooseLogger');

  return {
    uri:
      <string>configService.get('APP_ENV') == 'test'
        ? <string>configService.get('MONGO_TEST_URL')
        : <string>configService.get('MONGO_URL'),
    retryAttempts: 5,
    connectionFactory: (connection: Connection) => {
      if (connection.readyState) {
        dbLogger.log('Mongo database connected');
      }
      return connection;
    },
  };
};
