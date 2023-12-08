import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAGS } from 'src/config/swagger.config';

@ApiTags(API_TAGS.auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'user sign in successful',
  })
  @ApiResponse({
    status: 401,
    description: 'invalid user credentails',
  })
  @ApiBody({ type: SignInRequestDto })
  @Post('sign-in')
  async signIn(@Body() signInData: SignInRequestDto) {
    return this.authService.signIn(signInData.email, signInData.password);
  }
}
