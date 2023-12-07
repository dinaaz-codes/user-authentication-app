import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  checkHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: `app running on ${this.configService.get('PORT')} port.`,
    };
  }
}
