import { ReportMutation } from "@/apis/Domains/Report/Report.mutation";
import { useMutation } from "@tanstack/react-query";
import { useReportTagList } from "../useCaroKann/useReportTagList";

export const useReportMutator = () => {
  const reportMutation = new ReportMutation();
  const [_, setTagList] = useReportTagList();

  const { mutate: DeleteReportMutate } = useMutation(reportMutation.deleteReport());
  const { mutate: CreateReportMutate } = useMutation(reportMutation.createReport(setTagList));
  const { mutate: UpdateReportMutate } = useMutation(reportMutation.updateReport(setTagList));
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
