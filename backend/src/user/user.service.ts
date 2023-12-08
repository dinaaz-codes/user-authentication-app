import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { ConflictError, NotFoundError } from '../common/errors/custom.error';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  excludeSensitiveInfo(user: UserDocument) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);

      if (existingUser)
        throw new ConflictError('User already exists with the given email');

      const user = new this.userModel();
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.name = createUserDto.name;

      await user.save();

      const newUserData = this.excludeSensitiveInfo(user);

      return newUserData;
    } catch (err) {
      this.logger.error(err.message, err, [createUserDto]);
      throw err;
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email: email });
  }

  async updateRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOneAndUpdate({ email }, { refreshToken });
    } catch (error) {
      this.logger.error('something went wrong in updateRefreshToken', error, [
        { email },
      ]);
      throw error;
    }
  }
}
