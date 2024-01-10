import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';
import {
  createUserStub,
  userStub,
  userWithoutSensitiveDataStub,
} from './stub/user.stub';
import { UserModel } from '../support/user.model';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    jest.clearAllMocks();
  });

  describe('excludeSensitiveInfo', () => {
    it('should return user without sensitive data', () => {
      const user = userStub();

      const expectedResult = {
        _id: user._id,
        email: user.email,
        name: user.name,
      };
      const result = userService.excludeSensitiveInfo(user as UserDocument);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findByEmail', () => {
    it('should return user on valid email', async () => {
      const existingUserEmail = userStub().email;
      const user = userStub();
      const findOneMock = jest
        .spyOn(userModel, 'findOne')
        .mockResolvedValueOnce(userStub());

      const result = await userService.findByEmail(existingUserEmail);

      expect(result._id).toEqual(user._id);
      expect(result.name).toEqual(user.name);
      expect(result.email).toEqual(user.email);
      expect(result.save).toBeDefined();
      expect(findOneMock).toHaveBeenCalledWith({ email: existingUserEmail });
    });

    it('should return null on passing invalid email', async () => {
      const unregisteredUserEmail = userStub().email;

      const findOneMock = jest
        .spyOn(userModel, 'findOne')
        .mockResolvedValueOnce(null);

      const result = await userService.findByEmail(unregisteredUserEmail);
      expect(result).toBeNull();
      expect(findOneMock).toHaveBeenCalledWith({
        email: unregisteredUserEmail,
      });
    });
  });

  // describe('create', () => {
  //   it('should create user', async () => {
  //     const createUser = createUserStub();
  //     const userDataWithoutSensitiveData = userWithoutSensitiveDataStub();

  //     const findByEmailMock = jest
  //       .spyOn(userService, 'findByEmail')
  //       .mockResolvedValueOnce(null);

  //     const excludeSensitiveInfoMock = jest
  //       .spyOn(userService, 'excludeSensitiveInfo')
  //       .mockReturnValue(userDataWithoutSensitiveData);

  //     const result = await userService.create(createUser);

  //     expect(result).toEqual(userDataWithoutSensitiveData);
  //   });
  // });
});
