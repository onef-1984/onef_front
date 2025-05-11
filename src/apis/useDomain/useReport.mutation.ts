import { ReportMutation } from "../Domains/Report/Report.mutation";
import { useMutation } from "@tanstack/react-query";

export const useReportMutation = () => {
  const DeleteReport = () => {
    return useMutation(new ReportMutation().deleteReport());
  };
  const CreateReport = () => {
    return useMutation(new ReportMutation().createReport());
  };
  const UpdateReport = () => {
    return useMutation(new ReportMutation().updateReport());
  };
  const ToggleReportLike = () => {
    return useMutation(new ReportMutation().toggleReportLike());
  };

  return { DeleteReport, CreateReport, UpdateReport, ToggleReportLike };
};
