import { GraphQLClient, RequestDocument } from "graphql-request";
import { QueryKey, queryOptions, UseMutationOptions, infiniteQueryOptions, InfiniteData } from "@tanstack/react-query";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BASE_URL + "/graphql", {
  credentials: "include",
});

export abstract class GraphQL {
  client = new GraphQLClient(process.env.NEXT_PUBLIC_BASE_URL + "/graphql", {
    credentials: "include",
  });

  graphql<T, V extends object>(query: RequestDocument, option?: { variables: V }) {
    return this.client.request<T>(query, option?.variables);
  }

  infiniteGraphql<T, V extends object>(query: RequestDocument, pageParam: V) {
    return this.client.request<T>(query, pageParam);
  }

  mutationOptions = <TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
    options: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationOptions<TData, TError, TVariables, TContext> => options;

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
