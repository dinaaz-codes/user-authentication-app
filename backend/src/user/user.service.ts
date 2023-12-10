import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { ConflictError } from '../common/errors/custom.error';
import { CreateUser } from './types';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  excludeSensitiveInfo(user: UserDocument) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async create(createUserData: CreateUser) {
    try {
      const existingUser = await this.findByEmail(createUserData.email);

      if (existingUser)
        throw new ConflictError('User already exists with the given email');

      const user = new this.userModel();
      user.email = createUserData.email;
      user.password = createUserData.password;
      user.name = createUserData.name;

      await user.save();

      const newUserData = this.excludeSensitiveInfo(user);

      return newUserData;
    } catch (error) {
      this.logger.error('something went wrong in create user', error, [
        createUserData,
      ]);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email: email });
  }

  async updateRefreshToken(email: string, refreshToken: string | undefined) {
    try {
      if (!refreshToken) {
        return await this.userModel.updateOne(
          { email },
          { $set: { refreshToken: null } },
        );
      }

      refreshToken = await argon2.hash(refreshToken);
      await this.userModel.updateOne({ email }, { refreshToken });
    } catch (error) {
      this.logger.error('something went wrong in updateRefreshToken', error, [
        { email },
      ]);
      throw error;
    }
  }
}
