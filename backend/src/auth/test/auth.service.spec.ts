import { Test } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { MockConfigService } from './../../../test/__mocks__/config.service.mock';
import { JwtService } from '@nestjs/jwt';
import { MockJwtService } from './../../../test/__mocks__/jwt.service.mock';
import { signUpDataStub } from './stubs/signUpData.stub';
import { tokenStub } from './stubs/tokens.stub';
import { AuthService } from '../auth.service';
import { createUserStub, userStub } from './../../user/test/stub/user.stub';
import {
  ConflictError,
  UnauthorizedError,
} from '../../common/errors/custom.error';
import { signInDataStub } from './stubs/signInData.stub';

jest.mock('../../user/user.service');
describe('Auth Service', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        { provide: ConfigService, useClass: MockConfigService },
        { provide: JwtService, useClass: MockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should sign up a user', async () => {
      const signUpData = signUpDataStub();
      const tokens = tokenStub();
      const user = userStub();

      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce(tokens.accessToken)
        .mockResolvedValueOnce(tokens.refreshToken);

      const result = await authService.signUp(signUpData);

      expect(userService.create).toHaveBeenCalledWith(createUserStub());
      expect(result).toEqual(tokens);
      expect(signAsyncSpy.mock.calls[0][0]).toEqual({
        sub: user._id,
        email: user.email,
      });
      expect(signAsyncSpy.mock.calls[1][0]).toEqual({
        sub: user._id,
        email: user.email,
      });
      expect(userService.updateRefreshToken).toHaveBeenCalledWith(
        user.email,
        tokens.refreshToken,
      );
    });

    it('should throw conflict error on user email duplicate', async () => {
      const signUpData = signUpDataStub();

      jest
        .spyOn(userService, 'create')
        .mockRejectedValue(
          new ConflictError('User already exists with the given email'),
        );
      await expect(async () => {
        return await authService.signUp(signUpData);
      }).rejects.toThrowError(ConflictError);
    });
  });

  describe('signIn', () => {
    it('should sign in successfully on correct user credentails', async () => {
      const signInData = signInDataStub();
      const tokens = tokenStub();

      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce(tokens.accessToken)
        .mockResolvedValueOnce(tokens.refreshToken);

      const validatePasswordSpy = jest
        .spyOn(authService, 'validatePassword')
        .mockResolvedValueOnce(true);

      const result = await authService.signIn(
        signInData.email,
        signInData.password,
      );

      expect(result).toEqual(tokens);
      expect(validatePasswordSpy).toHaveBeenCalledWith(
        userStub().password,
        signInData.password,
      );
    });

    it('should throw unauthorized error on invalid user password', async () => {
      const validatePasswordSpy = jest
        .spyOn(authService, 'validatePassword')
        .mockResolvedValueOnce(false);
      try {
        const signInData = signInDataStub();

        await authService.signIn(signInData.email, signInData.password);
      } catch (error) {
        expect(error instanceof UnauthorizedError).toBe(true);
        expect(validatePasswordSpy).toHaveBeenCalled();
      }
    });

    it('should throw unauthorized error on invalid user email', async () => {
      const findUserByEmailMock = jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValueOnce(null);
      const signInData = signInDataStub();

      expect(async () => {
        return await authService.signIn(signInData.email, signInData.password);
      }).rejects.toThrowError(UnauthorizedError);

      expect(findUserByEmailMock).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should sign out', async () => {
      const signInData = signInDataStub();

      await authService.signOut(signInData.email);

      expect(userService.findByEmail).toHaveBeenCalledWith(signInData.email);
      expect(userService.updateRefreshToken).toHaveBeenCalled();
    });

    it('should throw unautorized error on invalid user email', async () => {
      const userEmail = signInDataStub().email;

      const findUserByEmailMock = jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValueOnce(null);

      try {
        await authService.signOut(userEmail);
      } catch (error) {
        expect(findUserByEmailMock).toHaveBeenCalledWith(userEmail);
        expect(error instanceof UnauthorizedError).toBe(true);
      }
    });
  });

  describe('refreshToken', () => {
    it('should return accessToken and refreshToken', async () => {
      return;
    });
  });
});
