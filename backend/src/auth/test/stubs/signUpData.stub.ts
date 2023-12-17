import { SignUpRequestDto } from '../../dto';

export const signUpDataStub = (): SignUpRequestDto => {
  return {
    name: 'test',
    email: 'test@example.com',
    password: 'P@ssw0rd',
  };
};
