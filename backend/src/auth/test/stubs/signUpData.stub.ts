import { SignUpRequestDto } from '../../dto';

export const signUpDataStub = (): SignUpRequestDto => {
  return {
    name: 'test',
    email: 'test@mailinator.com',
    password: 'P@ssw0rd',
  };
};
