import { ReportMutation } from "@/apis/Domains/Report/Report.mutation";
import { useMutation } from "@tanstack/react-query";

export const useReportMutator = () => {
  const reportMutation = new ReportMutation();

  const { mutate: DeleteReportMutate } = useMutation(reportMutation.deleteReport());
  const { mutate: CreateReportMutate } = useMutation(reportMutation.createReport());
  const { mutate: UpdateReportMutate } = useMutation(reportMutation.updateReport());
  const { mutate: ToggleReportLikeMutate, isPending: isToggleReportLikePending } = useMutation(
    reportMutation.toggleReportLike(),
  );

  return {
    DeleteReportMutate,
    CreateReportMutate,
    UpdateReportMutate,
    ToggleReportLikeMutate,
    isToggleReportLikePending,
  };
};
