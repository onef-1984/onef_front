import { CreateReport } from "@/types/report.types";
import { MutationFn } from "./MutationFn";

export class ReportMutation extends MutationFn {
  constructor() {
    super();
  }

  postReport() {
    return (data: CreateReport | undefined) => this.mutationFn<{ id: string }>("/report", "post", data);
  }

  putReport() {
    return (reportId: string, data: Partial<CreateReport>) => this.mutationFn(`/report/${reportId}`, "put", data);
  }

  deleteReport() {
    return (reportId: string) => this.mutationFn(`/report/${reportId}`, "delete");
  }
}
