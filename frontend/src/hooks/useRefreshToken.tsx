import axios, { apiEndpoints } from "../api/axios";
import { AxiosResponse } from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response: AxiosResponse<{ accessToken: string }> = await axios.post(
      apiEndpoints.auth.refreshToken,
      {},
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
