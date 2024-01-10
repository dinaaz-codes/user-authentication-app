import { User } from '../entities/user.entity';
import { userStub } from '../test/stub/user.stub';
import { ModelMock } from './../../database/test/support/model.mock';

export class UserModel extends ModelMock<User> {
  protected entityStub = userStub() as User;
}
