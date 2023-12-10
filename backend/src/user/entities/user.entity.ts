import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as argon2 from 'argon2';
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

  @Prop({
    nullable: true,
  })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error) {
      logger.error('something went wrong while hashing user password', error, [
        this,
      ]);
      return next(error);
    }
  }
  next();
});
