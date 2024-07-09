import fetcher from "../../axios";

export class QueryFn {
  queryFn<T>(url: string) {
    return () =>
      fetcher<T>({
        method: "get",
        url,
      });
  }
}
