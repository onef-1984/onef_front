import { QueryFn } from "./QueryFn";
import { ReportEndPoint } from "@/apis/endpoints/report";

export class ReportQuery extends QueryFn {
  constructor(private reviewId: string) {
    super();
  }

  queryKey = ["report", this.reviewId];

  getReport() {
    return {
      queryKey: [...this.queryKey],
      queryFn: this.queryFn<Report>(ReportEndPoint.getReport(this.reviewId)),
      enabled: !!this.reviewId,
      retry: 1,
    };
  }
}
