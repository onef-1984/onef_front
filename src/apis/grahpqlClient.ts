import { GraphQLClient, RequestDocument } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BASE_URL + "/graphql", {
  credentials: "include",
});

export class GraphQL {
  graphql<T, V extends object>(query: RequestDocument, option?: { variables: V }) {
    return client.request<T>(query, option?.variables);
  }

  infiniteGraphql<T, V extends object>(query: RequestDocument, pageParam: V) {
    return client.request<T>(query, pageParam);
  }
}
