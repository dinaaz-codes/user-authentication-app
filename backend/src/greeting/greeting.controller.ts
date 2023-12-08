import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { API_TAGS } from 'src/config/swagger.config';

@ApiBearerAuth('JWT-auth')
@ApiTags(API_TAGS.greeting)
@UseGuards(AuthGuard)
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
