import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { ConfigService } from '@nestjs/config';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [ConfigService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should return status and message', () => {
      const result = controller.checkHealth();
      expect(result.status).toBe('ok');
      expect(result.message).toBeDefined();
    });
  });
});
