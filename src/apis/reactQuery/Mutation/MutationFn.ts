import fetcher from "@/apis/axios";

export class MutationFn {
  mutationFn<T>(url: string, method: "post" | "put" | "delete", data: any) {
    return fetcher<T>({
      method,
      url,
      data,
    });
  }
}
