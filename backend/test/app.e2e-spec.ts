import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigService } from '@nestjs/config';
import { MockConfigService } from './__mocks__/config.service.mock';

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
    app.setGlobalPrefix('/api');
    await app.init();
  });

  describe('Health', () => {
    it('/api/health (GET)', () => {
      const expectedResponse = {
        status: 'ok',
        message: 'app running on 4000 port.',
      };
      return request(app.getHttpServer())
        .get('/api/health')
        .expect(200)
        .expect(expectedResponse);
    });
  });
});
