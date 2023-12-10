import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_TAGS } from '../config/swagger.config';
import { SignUpRequestDto } from './dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { JwtPayload, JwtRtPayload, TokenResponse } from './types';
import { Public } from '../common/decorators';
import { Response } from 'express';

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
  async signUp(
    @Res({ passthrough: true }) response: Response,
    @Body() signUpData: SignUpRequestDto,
  ): Promise<TokenResponse> {
    const tokens = await this.authService.signUp(signUpData);
    const expires = new Date();

    expires.setDate(expires.getDate() + 7);

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      expires,
    });

    return {
      accessToken: tokens.accessToken,
    };
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
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInData: SignInRequestDto,
  ): Promise<TokenResponse> {
    const tokens = await this.authService.signIn(
      signInData.email,
      signInData.password,
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      expires,
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully created user ',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'access denied',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'invalid auth credentails',
  })
  @ApiOperation({
    summary: 'Get data',
    description: 'Retrieve data with Bearer token',
  })
  @ApiCookieAuth('in-app-cookie-refresh_token')
  async refreshTokens(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() currentUser: JwtRtPayload,
  ): Promise<TokenResponse> {
    const tokens = await this.authService.refreshTokens(
      currentUser.email,
      currentUser.refreshToken,
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      expires,
    });

    return {
      accessToken: tokens.accessToken,
    };
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
  async signOut(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    this.authService.signOut(currentUser.email);
    response.clearCookie('refresh_token', { httpOnly: true });
    return;
  }
}
