import fetcher from "../../axios";
import { RequestDocument } from "graphql-request";
import { client } from "../grahpqlClient";

export class QueryFn {
  queryFn<T>(url: string) {
    return () =>
      fetcher<T>({
        method: "get",
        url,
      });
  }

  graphql<T, V extends object>(query: RequestDocument, { variables }: { variables: V }) {
    return () => client.request<T>(query, variables);
  }

  infiniteGraphql<T, V extends object>(query: RequestDocument) {
    return async ({ pageParam }: { pageParam: V }) => client.request<T>(query, pageParam);
  }

  infiniteQueryFn<T>(url: string) {
    return ({ pageParam }: { pageParam: number }) =>
      fetcher<T>({
        method: "get",
        url: `${url}&skip=${pageParam}`,
      });
  }
}
