import { Types } from 'mongoose';
import { UserDocument } from './../../entities/user.entity';

export const userWithoutSensitiveDataStub = () => {
  return {
    _id: new Types.ObjectId('6572f644f9928615dad9f9b2'),
    email: 'test@mailinator.com',
    name: 'test',
  };
};

export const userStub = (): Partial<UserDocument> => {
  return {
    _id: new Types.ObjectId('6572f644f9928615dad9f9b2'),
    name: 'test',
    email: 'test@example.com',
    password: 'hashedPassword',
    refreshToken: 'someRefreshToken',
    save: jest.fn(),
  };
};
