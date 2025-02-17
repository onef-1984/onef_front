import { InfiniteData, infiniteQueryOptions, QueryKey, queryOptions } from "@tanstack/react-query";
import { Fetcher } from "./Fetcher";
import { RequestDocument } from "graphql-request";

export abstract class Query extends Fetcher {
  abstract queryKey: QueryKey;

  queryFn<T>(url: string) {
    return () =>
      this.doFetch<T>({
        method: "get",
        url,
      });
  }

  infiniteQueryFn<T>(url: string) {
    return ({ pageParam }: { pageParam: number }) =>
      this.doFetch<T>({
        method: "get",
        url: `${url}&skip=${pageParam}`,
      });
  }

  graphql<T, V extends object>(query: RequestDocument, variables?: V) {
    return this.doRequest<T, V>(query, variables);
  }

  queryOptions = <TQueryFnData = unknown, TError = Error, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: Parameters<typeof queryOptions<TQueryFnData, TError, TData, TQueryKey>>[0],
  ) => queryOptions(options);

  infiniteQueryOptions = <
    TQueryFnData,
    TError = Error,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: Parameters<typeof infiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>>[0],
  ) => infiniteQueryOptions(options);
}
