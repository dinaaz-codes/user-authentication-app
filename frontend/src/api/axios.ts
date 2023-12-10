import axios from "axios";
const BASE_URL = "http://localhost:4000/api";

export const apiEndpoints = {
  auth: {
    signUp: `/auth/sign-up`,
    signIn: `/auth/sign-in`,
    signOut: `/auth/sign-out`,
    refreshToken: `/auth/refresh-token`,
  },
  dashboard: {
    greetings: `/greeting/welcome`,
  },
  health: {
    ping: `/health`,
  },
};

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
