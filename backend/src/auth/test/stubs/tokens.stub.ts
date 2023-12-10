import { Tokens } from '../../types/';

export const tokenStub = (): Tokens => {
  return {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTc2MTk2OWJiZjY1NTUxMTM0YjA5YmUiLCJlbWFpbCI6InRlc3RAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MDIyMzg1NjksImV4cCI6MTcwMjI0MjE2OX0.Yhw210bXXvZuixN4ZhmK65DaAR209zweo4oQK4P8-gY',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTc2MTk2OWJiZjY1NTUxMTM0YjA5YmUiLCJlbWFpbCI6InRlc3RAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MDIyMzg1NjksImV4cCI6MTcwMjg0MzM2OX0.bFQGm0pCztAZmfKbppDxfLM-LUwRUFs-_tACnKCBbFg',
  };
};

export const refreshedTokenStub = (): Tokens => {
  return {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTc2MTk2OWJiZjY1NTUxMTM0YjA5YmUiLCJlbWFpbCI6InRlc3RAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MDIyMzg2NzcsImV4cCI6MTcwMjI0MjI3N30.qXrTNP0hd5UoTEdUmi36qTdbVNxSeviLEED0ZzSjCLs',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTc2MTk2OWJiZjY1NTUxMTM0YjA5YmUiLCJlbWFpbCI6InRlc3RAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MDIyMzg2NzcsImV4cCI6MTcwMjg0MzQ3N30.SGvJqW1Nk8hA7epihzvJrAckS7t4D8ZV3OMQjxLlnTg',
  };
};
