import { ReportMutation } from "../Domains/Report/Report.mutation";
import { useMutation } from "@tanstack/react-query";

export class useReportMutation {
  private reportMutation = new ReportMutation();

  deleteReport = () => useMutation(this.reportMutation.deleteReport());
  createReport = () => useMutation(this.reportMutation.createReport());
  updateReport = () => useMutation(this.reportMutation.updateReport());
  toggleReportLike = () => useMutation(this.reportMutation.toggleReportLike());
}
