import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { TokenResponse, Tokens } from '../types';
import {
  refreshedTokenResponseStub,
  tokenResponseStub,
} from './stubs/tokenResponse.stub';
import { Response } from 'express';
import { refreshedTokenStub, tokenStub } from './stubs/tokens.stub';
import { signInDataStub } from './stubs/signInData.stub';
import {
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
} from '../../common/errors/custom.error';
import { signUpDataStub } from './stubs/signUpData.stub';
import { jwtRtPayloadStub } from './stubs/jwtRtPayload.stub';
import { jwtPayloadStub } from './stubs/jwtPayload.stub';

jest.mock('../auth.service');
describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return access token on successful sign-in', async () => {
      const signInData = signInDataStub();

      const tokens: Tokens = tokenStub();
      const token: TokenResponse = tokenResponseStub();

      const mockResponse: Partial<Response> = {
        cookie: jest.fn(),
      };

      jest.spyOn(authService, 'signIn').mockResolvedValue(tokens);

      const result = await authController.signIn(
        mockResponse as Response,
        signInData,
      );

      expect(result).toEqual(token);
      expect(authService.signIn).toHaveBeenCalledWith(
        signInData.email,
        signInData.password,
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refresh_token',
        tokens.refreshToken,
        {
          httpOnly: true,
          expires: expect.any(Date),
        },
      );
    });

    it('should throw unauthorized error', async () => {
      const signInData = signInDataStub();

      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValue(new UnauthorizedError('invalid user credentails'));

      await expect(async () =>
        authController.signIn({} as Response, signInData),
      ).rejects.toThrowError(UnauthorizedError);
    });
  });

  describe('signUp', () => {
    it('should return access token on succesful sign-up', async () => {
      const signUpData = signUpDataStub();
      const tokens: Tokens = tokenStub();
      const token: TokenResponse = tokenResponseStub();

      const mockResponse: Partial<Response> = {
        cookie: jest.fn(),
      };

      jest.spyOn(authService, 'signUp').mockResolvedValue(tokens);

      const result = await authController.signUp(
        mockResponse as Response,
        signUpData,
      );

      expect(result).toEqual(token);
      expect(authService.signUp).toHaveBeenCalledWith(signUpData);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refresh_token',
        tokens.refreshToken,
        {
          httpOnly: true,
          expires: expect.any(Date),
        },
      );
    });

    it('should return conflict error on using existing email', async () => {
      const signUpData = signUpDataStub();

      jest
        .spyOn(authService, 'signUp')
        .mockRejectedValue(
          new ConflictError('User already exists with the given email'),
        );

      await expect(async () =>
        authController.signUp({} as Response, signUpData),
      ).rejects.toThrowError(ConflictError);
    });
  });

  describe('refreshToken', () => {
    it('should return access token on successful valid refresh token', async () => {
      const currentUserData = jwtRtPayloadStub();
      const tokens: Tokens = refreshedTokenStub();
      const token: TokenResponse = refreshedTokenResponseStub();

      const mockResponse: Partial<Response> = {
        cookie: jest.fn(),
      };

      jest.spyOn(authService, 'refreshTokens').mockResolvedValue(tokens);

      const result = await authController.refreshTokens(
        mockResponse as Response,
        currentUserData,
      );

      expect(result).toStrictEqual(token);
      expect(authService.refreshTokens).toHaveBeenCalledWith(
        currentUserData.email,
        currentUserData.refreshToken,
      );

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refresh_token',
        tokens.refreshToken,
        {
          httpOnly: true,
          expires: expect.any(Date),
        },
      );
    });

    it('should return unauthorized error on using expired/invalid refresh token', async () => {
      const currentUserData = jwtRtPayloadStub();

      jest
        .spyOn(authService, 'refreshTokens')
        .mockRejectedValue(new UnauthorizedError('invalid user credentails'));

      await expect(async () =>
        authController.refreshTokens({} as Response, currentUserData),
      ).rejects.toThrowError(UnauthorizedError);
    });

    it('should return forbidden error on using revoked refresh token', async () => {
      const currentUserData = jwtRtPayloadStub();

      jest
        .spyOn(authService, 'refreshTokens')
        .mockRejectedValue(new ForbiddenError('access denied'));

      await expect(async () =>
        authController.refreshTokens({} as Response, currentUserData),
      ).rejects.toThrowError(ForbiddenError);
    });
  });

  describe('signOut', () => {
    it('should clear cookie', async () => {
      const currentUserData = jwtPayloadStub();

      const mockResponse: Partial<Response> = {
        clearCookie: jest.fn(),
      };

      jest.spyOn(authService, 'signOut').mockResolvedValue(undefined);

      const result = await authController.signOut(
        mockResponse as Response,
        currentUserData,
      );

      expect(authService.signOut).toHaveBeenCalledWith(currentUserData.email);
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('refresh_token', {
        httpOnly: true,
      });
    });
  });
});
