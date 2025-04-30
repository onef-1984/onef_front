import {
  DataTag,
  DefaultError,
  DefinedInitialDataInfiniteOptions,
  DefinedInitialDataOptions,
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
  UnusedSkipTokenInfiniteOptions,
  UnusedSkipTokenOptions,
} from "@tanstack/react-query";
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

  queryOptions<TQueryFnData = unknown, TError = Error, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  ): DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & {
    queryKey: DataTag<TQueryKey, TQueryFnData, TError>;
  };
  queryOptions<TQueryFnData = unknown, TError = Error, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>,
  ): UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey> & {
    queryKey: DataTag<TQueryKey, TQueryFnData, TError>;
  };
  queryOptions<TQueryFnData = unknown, TError = Error, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  ): UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & {
    queryKey: DataTag<TQueryKey, TQueryFnData, TError>;
  };
  queryOptions(options: any) {
    return options;
  }

  infiniteQueryOptions<
    TQueryFnData,
    TError = Error,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: DefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
  ): DefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> & {
    queryKey: DataTag<TQueryKey, InfiniteData<TQueryFnData>, TError>;
  };
  infiniteQueryOptions<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: UnusedSkipTokenInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
  ): UnusedSkipTokenInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> & {
    queryKey: DataTag<TQueryKey, InfiniteData<TQueryFnData>, TError>;
  };
  infiniteQueryOptions<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
  ): UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> & {
    queryKey: DataTag<TQueryKey, InfiniteData<TQueryFnData>, TError>;
  };
  infiniteQueryOptions(options: any) {
    return options;
  }
}
