import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";

export const useDeleteReportMutation = () => {
  const { push, id: reportId } = useRouterAdv();

  const queryClient = useQueryClient();

  const reportMutation = new ReportMutation();

  const { mutate } = useMutation({
    mutationFn: reportMutation.deleteReport(reportId),
    onSuccess: () => {
      alert("리뷰가 삭제되었습니다.");
      push("/");
      queryClient.invalidateQueries({ queryKey: ["report", reportId] });
    },
  });

  return { mutate };
};
