import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAGS } from 'src/config/swagger.config';
import { SignUpRequestDto } from './dto';

@ApiTags(API_TAGS.auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiBody({ type: SignUpRequestDto })
  @ApiResponse({
    status: 201,
    description: 'successfully created user ',
  })
  @ApiResponse({
    status: 409,
    description: 'user already exists',
  })
  async signUp(@Body() signUpData: SignUpRequestDto) {
    return this.authService.signUp(signUpData);
  }

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
