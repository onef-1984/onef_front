import { CreateReport } from "@/types/report.types";
import { MutationFn } from "./MutationFn";
import { Response } from "@/types/util.types";

export class ReportMutation extends MutationFn {
  constructor() {
    super();
  }

  postReport() {
    return (data: CreateReport | undefined) => this.mutationFn<{ id: string }>("/report", "post", data);
  }

  putReport(reportId: string) {
    return (data: Partial<CreateReport>) => this.mutationFn(`/report/${reportId}`, "put", data);
  }

  deleteReport(reportId: string) {
    return () => this.mutationFn(`/report/${reportId}`, "delete");
  }

  reportLike(reportId: string) {
    return (method: "post" | "delete") => this.mutationFn<Response>(`/report/${reportId}/like`, method);
  }
}
