import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const FRONTEND_URL = process.env.FRONTEND_URL;
const APP_ENV = process.env.APP_ENV;

export const corsConfigs = (): CorsOptions => {
  const origin =
    APP_ENV == 'production' || <string>FRONTEND_URL
      ? FRONTEND_URL
      : 'http://localhost:5173';
  console.log(origin);
  return {
    origin: origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  };
};
