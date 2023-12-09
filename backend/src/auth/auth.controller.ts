import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { JwtPayload, JwtRtPayload } from './types';
import { Public } from 'src/common/decorators';

@ApiTags(API_TAGS.auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
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

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
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

  @Public()
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

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully logged user out ',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'invalid user credentails',
  })
  @ApiOperation({
    summary: 'Get data',
    description: 'Retrieve data with Bearer token',
  })
  async signOut(@CurrentUser() currentUser: JwtPayload) {
    return this.authService.signOut(currentUser.email);
  }
}
