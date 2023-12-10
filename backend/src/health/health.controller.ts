import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_TAGS } from '../config/swagger.config';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Public } from '../common/decorators';

@Public()
@ApiTags(API_TAGS.health)
@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @ApiResponse({
    status: 200,
    description: 'server is up and running',
  })
  @Get()
  checkHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: `app running on ${this.configService.get('PORT')} port.`,
    };
  }
}
