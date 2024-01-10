import { tokenStub } from '../test/stubs/tokens.stub';

export const AuthService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockResolvedValue(tokenStub()),
  signIn: jest.fn().mockResolvedValue(tokenStub()),
  refreshTokens: jest.fn().mockResolvedValue(tokenStub()),
  signOut: jest.fn().mockResolvedValue(undefined),
  getTokens: jest.fn(),
});
