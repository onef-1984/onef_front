import { Report, TimeStamp } from "@/types/server.types";
import fetcher from "./axios";

class QueryFn {
  queryFn<T>(url: string) {
    return () =>
      fetcher<T>({
        method: "get",
        url,
      });
  }
}

export class ReportQuery extends QueryFn {
  constructor(private reviewId: string) {
    super();
  }

  queryKey = ["review", this.reviewId];

  getReport() {
    return {
      queryKey: [...this.queryKey],
      queryFn: this.queryFn<Report & TimeStamp>(`/report/${this.reviewId}`),
      enabled: !!this.reviewId,
    };
  }
}
