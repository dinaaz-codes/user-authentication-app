import { Injectable } from '@nestjs/common';

@Injectable()
export class MockConfigService {
  get(key: string) {
    if (key === 'PORT') {
      return 4000;
    }
    if (key === 'APP_ENV') {
      return 'test';
    }

    if (key === 'MONGO_URL') {
      return undefined;
    }

    if (key === 'MONGO_TEST_URL') {
      return 'mongodb+srv://easy-generator-api:8eoC2jwtqZXAeeGj@cluster0.2vaw0l1.mongodb.net?retryWrites=true&w=majority';
    }

    if (key === 'JWT_SECRET') {
      return 'testjwt';
    }

    if (key === 'JWT_RT_SECRET') {
      return 'testrtjwt';
    }

    if (key === 'FRONTEND_URL') {
      return 'http://localhost:3000';
    }
  }
}
