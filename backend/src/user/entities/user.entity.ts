import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { Logger } from '@nestjs/common';
import { SALT_ROUNDS } from 'src/common/constants';

export type UserDocument = HydratedDocument<User>;

const logger = new Logger('UserEntity');

@Schema({ timestamps: true, versionKey: false, id: true })
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    nullable: true,
  })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    } catch (error) {
      logger.error('something went wrong while hashing user password', error, [
        this,
      ]);
      return next(error);
    }
  }

  if (this.isModified('refreshToken') && this.refreshToken) {
    try {
      this.refreshToken = await argon2.hash(this.refreshToken);
    } catch (error) {
      logger.error('something went wrong while hashing refresh token', error, [
        this,
      ]);
    }
  }
  next();
});
