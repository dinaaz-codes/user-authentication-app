import { Injectable, Logger } from '@nestjs/common';
import {
  ForbiddenError,
  UnauthorizedError,
} from '../common/errors/custom.error';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../common/constants';
import { Tokens } from './types';
import { SignUpRequestDto } from './dto';
import { Types } from 'mongoose';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpData: SignUpRequestDto): Promise<Tokens> {
    try {
      const user = await this.userService.create(signUpData);

      const payload = { sub: user._id, email: user.email };

      const tokens = await this.getTokens(payload);

      await this.userService.updateRefreshToken(
        user.email,
        tokens.refreshToken,
      );

      return tokens;
    } catch (error) {
      this.logger.error(`something went wrong in signUp`, error, [
        { email: signUpData.email },
      ]);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<Tokens> {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user || !(await this.validatePassword(user.password, password)))
        throw new UnauthorizedError('invalid user credentails');

      const userData = this.userService.excludeSensitiveInfo(user);

      const payload = { sub: userData._id, email: userData.email };
      const tokens = await this.getTokens(payload);

      await this.userService.updateRefreshToken(email, tokens.refreshToken);

      return tokens;
    } catch (error) {
      this.logger.error(`something went wrong in signIn`, error, [{ email }]);
      throw error;
    }
  }

  async refreshTokens(email: string, refreshToken: string): Promise<Tokens> {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) throw new UnauthorizedError('invalid user credentails');

      if (!user.refreshToken) throw new ForbiddenError('access denied');

      const hasMatched = await argon2.verify(user.refreshToken, refreshToken);
      if (!hasMatched) throw new ForbiddenError('access denied');

      const payload = { sub: user.id, email: user.email };

      const tokens = await this.getTokens(payload);

      await this.userService.updateRefreshToken(email, tokens.refreshToken);

      return tokens;
    } catch (error) {
      this.logger.error('something went wrong in refreshTokens', error, [
        { email },
      ]);

      throw error;
    }
  }

  async signOut(email: string): Promise<void> {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) throw new UnauthorizedError('invalid user credentails');

      await this.userService.updateRefreshToken(email, undefined);

      return;
    } catch (error) {
      this.logger.error('something went wrong in signOut', error, [{ email }]);

      throw error;
    }
  }

  private async getTokens(payload: {
    sub: Types.ObjectId;
    email: string;
  }): Promise<Tokens> {
    try {
      const accessTokenPromise = this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: ACCESS_TOKEN_EXPIRY,
      });

      const refreshTokenPromise = this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_RT_SECRET'),
        expiresIn: REFRESH_TOKEN_EXPIRY,
      });

      const [accessToken, refreshToken] = await Promise.all([
        accessTokenPromise,
        refreshTokenPromise,
      ]);

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('something went wrong in getTokens', error, [payload]);
      throw error;
    }
  }

  private async validatePassword(
    hashPassword,
    candidatePassword,
  ): Promise<boolean> {
    return await argon2.verify(hashPassword, candidatePassword);
  }
}
