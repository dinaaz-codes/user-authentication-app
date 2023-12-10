import { userStub, userWithoutSensitiveDataStub } from '../test/stub/user.stub';

export const UserService = jest.fn().mockReturnValue({
  excludeSensitiveInfo: jest
    .fn()
    .mockReturnValue(userWithoutSensitiveDataStub()),
  create: jest.fn().mockResolvedValue(userWithoutSensitiveDataStub),
  findByEmail: jest.fn().mockResolvedValue(userStub()),
  updateRefreshToken: jest.fn().mockResolvedValue(undefined),
});
