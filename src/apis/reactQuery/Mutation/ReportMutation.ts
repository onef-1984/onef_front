import { CreateReport } from "@/types/report.types";
import { MutationFn } from "./MutationFn";
import { Item } from "@/types/book.types";

export class ReportMutation extends MutationFn {
  constructor() {
    super();
  }

  postReport() {
    return (data: CreateReport | undefined) => this.mutationFn<{ id: string }>("/report", "post", data);
  }

  patchReport() {
    return (reportId: string, data: Partial<CreateReport>) => this.mutationFn(`/report/${reportId}`, "patch", data);
  }

  deleteReport() {
    return (reportId: string) => this.mutationFn(`/report/${reportId}`, "delete");
  }
}
