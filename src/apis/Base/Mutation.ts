import { UseMutationOptions } from "@tanstack/react-query";
import { Fetcher } from "./Fetcher";
import { RequestDocument } from "graphql-request";

export abstract class Mutation extends Fetcher {
  mutationFn<T>(url: string, method: "post" | "put" | "patch" | "delete", data?: any) {
    return this.doFetch<T>({
      method,
      url,
      data,
    });
  }

  graphql<T, V extends object>(query: RequestDocument, variables: V) {
    return this.doRequest<T, V>(query, variables);
  }

  mutationOptions = <TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
    options: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationOptions<TData, TError, TVariables, TContext> => options;
}
