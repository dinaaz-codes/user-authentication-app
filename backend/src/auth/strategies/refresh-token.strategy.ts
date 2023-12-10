import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: RefreshTokenStrategy.extractJWT,
      secretOrKey: configService.get('JWT_RT_SECRET'),
      passReqToCallback: true,
    });
  }

  private static extractJWT(request: Request): string | null {
    if (
      request.cookies &&
      'refresh_token' in request.cookies &&
      request.cookies.refresh_token.length > 0
    ) {
      return request.cookies.refresh_token;
    }
    return null;
  }

  validate(request: Request, payload: JwtPayload) {
    const refreshToken = request.cookies.refresh_token;

    if (!refreshToken) throw new UnauthorizedException('refresh token missing');

    return {
      ...payload,
      refreshToken,
    };
  }
}
