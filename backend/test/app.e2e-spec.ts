import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigService } from '@nestjs/config';
import { MockConfigService } from './mocks/config.service.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(new MockConfigService())
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api/v1');
    await app.init();
  });

  describe('Health', () => {
    it('/api/v1/health (GET)', () => {
      const expectedResponse = {
        status: 'ok',
        message: 'app running on 4000 port.',
      };
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect(expectedResponse);
    });
  });
});
