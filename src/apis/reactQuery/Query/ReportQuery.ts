import { QueryFn } from "./QueryFn";
import { Report, TimeStamp } from "@/types/server.types";

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
      retry: 1,
    };
  }
}
