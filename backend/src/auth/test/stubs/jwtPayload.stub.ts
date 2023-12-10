import { JwtPayload } from '../../types';

export const jwtPayloadStub = (): JwtPayload => {
  return {
    email: 'test@mailinator.com',
    sub: '6572f644f9928615dad9f9b2',
  };
};
