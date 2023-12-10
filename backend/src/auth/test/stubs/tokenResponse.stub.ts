import { TokenResponse } from '../../types/';

export const tokenResponseStub = (): TokenResponse => {
  return {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTc2MTk2OWJiZjY1NTUxMTM0YjA5YmUiLCJlbWFpbCI6InRlc3RAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MDIyMzg1NjksImV4cCI6MTcwMjI0MjE2OX0.Yhw210bXXvZuixN4ZhmK65DaAR209zweo4oQK4P8-gY',
  };
};

export const refreshedTokenResponseStub = (): TokenResponse => {
  return {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTc2MTk2OWJiZjY1NTUxMTM0YjA5YmUiLCJlbWFpbCI6InRlc3RAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MDIyMzg2NzcsImV4cCI6MTcwMjI0MjI3N30.qXrTNP0hd5UoTEdUmi36qTdbVNxSeviLEED0ZzSjCLs',
  };
};
