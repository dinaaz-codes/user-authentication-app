import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_TAGS } from '../config/swagger.config';
import { AccessTokenGuard } from 'src/auth/guards/auth.guard';

@ApiBearerAuth('JWT-auth')
@ApiTags(API_TAGS.greeting)
@UseGuards(AccessTokenGuard)
@Controller('greeting')
export class GreetingController {
  @Get('welcome')
  @ApiOperation({
    summary: 'Get data',
    description: 'Retrieve data with Bearer token',
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized access detected',
  })
  @ApiResponse({
    status: 200,
    description: 'returns welcome message for signed in user',
  })
  async onBoardMessage() {
    return {
      message: 'welcome to the application',
    };
  }
}
