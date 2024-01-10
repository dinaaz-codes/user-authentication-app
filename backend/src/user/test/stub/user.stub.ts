import { Types } from 'mongoose';
import { UserDocument } from './../../entities/user.entity';
import { CreateUser } from './../../types';

export const userWithoutSensitiveDataStub = () => {
  return {
    _id: new Types.ObjectId('6572f644f9928615dad9f9b2'),
    email: 'test@example.com',
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
    toObject: jest.fn().mockReturnValue({
      _id: new Types.ObjectId('6572f644f9928615dad9f9b2'),
      name: 'test',
      email: 'test@example.com',
      password: 'hashedPassword',
      refreshToken: 'someRefreshToken',
    }),
  };
};

export const createUserStub = (): CreateUser => {
  return {
    name: 'test',
    email: 'test@example.com',
    password: 'P@ssw0rd',
  };
};
