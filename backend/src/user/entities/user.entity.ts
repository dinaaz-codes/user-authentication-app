import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../config/settings.config';
import { Logger } from '@nestjs/common';

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
  next();
});
