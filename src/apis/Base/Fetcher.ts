import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { GraphQLClient, RequestDocument } from "graphql-request";

export class Fetcher {
  private instance: AxiosInstance;
  private client: GraphQLClient;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      timeout: 5 * 1000,
      withCredentials: true,
    });

    this.client = new GraphQLClient(process.env.NEXT_PUBLIC_BASE_URL + "/graphql", {
      credentials: "include",
    });
  }

  public async doFetch<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance<T>({
      ...config,
    });

    return data;
  }

  public async doRequest<T, V extends object>(
    query: RequestDocument,
    variables?: V,
    requestHeaders?: HeadersInit,
  ): Promise<T> {
    return this.client.request(query, variables, requestHeaders);
  }
}
