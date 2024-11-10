import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5 * 1000,
  withCredentials: true,
});

const fetcher = async <T>(config: AxiosRequestConfig) => {
  try {
    const { data } = await instance<T>({
      ...config,
    });

    return data;
  } catch (e: any) {
    return e.response.data as T;
  }
};

export default fetcher;
