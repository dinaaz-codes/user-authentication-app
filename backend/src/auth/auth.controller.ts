import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_TAGS } from '../config/swagger.config';
import { SignUpRequestDto } from './dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { JwtRtPayload } from './types';

@ApiTags(API_TAGS.auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiBody({ type: SignUpRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created user ',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'user already exists',
  })
  async signUp(@Body() signUpData: SignUpRequestDto) {
    return this.authService.signUp(signUpData);
  }

  @Post('sign-in')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user sign in successful',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'invalid user credentails',
  })
  @ApiBody({ type: SignInRequestDto })
  async signIn(@Body() signInData: SignInRequestDto) {
    return this.authService.signIn(signInData.email, signInData.password);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully created user ',
  })
  @ApiResponse({
    status: 409,
    description: 'user already exists',
  })
  @ApiOperation({
    summary: 'Get data',
    description: 'Retrieve data with Bearer token',
  })
  @ApiBearerAuth('JWT-rt-auth')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(@CurrentUser() currentUser: JwtRtPayload) {
    return this.authService.refreshTokens(
      currentUser.email,
      currentUser.refreshToken,
    );
  }
}
