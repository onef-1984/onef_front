import fetcher from "@/apis/axios";
import { client } from "../../grahpqlClient";
import { RequestDocument } from "graphql-request";

export class MutationFn {
  mutationFn<T>(url: string, method: "post" | "put" | "patch" | "delete", data?: any) {
    return fetcher<T>({
      method,
      url,
      data,
    });
  }

  graphql<T, V extends object>(query: RequestDocument, option?: { variables: V }) {
    return client.request<T>(query, option?.variables);
  }
}
