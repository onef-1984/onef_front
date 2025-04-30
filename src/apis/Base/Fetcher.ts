import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { GraphQLClient, RequestDocument } from "graphql-request";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5 * 1000,
  withCredentials: true,
});

const client: GraphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_BASE_URL + "/graphql", {
  credentials: "include",
});

export class Fetcher {
  public async doFetch<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await instance<T>({
      ...config,
    });

    return data;
  }

  public async doRequest<T, V extends object>(
    query: RequestDocument,
    variables?: V,
    requestHeaders?: HeadersInit,
  ): Promise<T> {
    return client.request(query, variables, requestHeaders);
  }
}
