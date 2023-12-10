import { JwtRtPayload } from '../../types';

export const jwtRtPayloadStub = (): JwtRtPayload => {
  return {
    email: 'test@mailinator.com',
    sub: '6572f644f9928615dad9f9b2',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTc1ODEyOWQzMjNmYzhjODdhNjllMjkiLCJlbWFpbCI6ImRpbmFAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MDIyMzMyMzgsImV4cCI6MTcwMjgzODAzOH0.020XlODfKh9AgjDJqHcDNXpwVXPcTWBKhrLHoPl7AIc',
  };
};
