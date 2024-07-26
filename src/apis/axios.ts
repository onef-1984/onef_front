import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://onef.co.kr/api",
  timeout: 5 * 1000,
  withCredentials: true,
});

const fetcher = async <T>(config: AxiosRequestConfig) => {
  const { data } = await instance<T>({
    ...config,
  });

  return data;
};

export default fetcher;
