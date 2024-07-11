import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://onef.co.kr/api",
  timeout: 5 * 1000,
  withCredentials: true,
  // validateStatus: function (status) {
  //   return status >= 200 && status < 600;
  // },
});

const fetcher = async <T>(config: AxiosRequestConfig) => {
  const { data } = await instance<T>({
    ...config,
  });

  return data;
};

export default fetcher;
