import fetcher from "../../axios";

export class QueryFn {
  queryFn<T>(url: string) {
    return () =>
      fetcher<T>({
        method: "get",
        url,
      });
  }

  infiniteQueryFn<T>(url: string) {
    return ({ pageParam }: { pageParam: number }) =>
      fetcher<T>({
        method: "get",
        url: `${url}&skip=${pageParam}`,
      });
  }
}
