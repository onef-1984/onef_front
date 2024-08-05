import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { toast } from "react-toastify";

export const useDeleteReportMutation = () => {
  const { back, id: reportId } = useRouterAdv();

  const queryClient = new QueryClient();
  const reportMutation = new ReportMutation();

  const { mutate } = useMutation({
    mutationFn: reportMutation.deleteReport(reportId),
    onSuccess: () => {
      toast.success("리포트가 삭제되었습니다.", {
        autoClose: 2000, // 5초 동안 알림 표시
      });

      back();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["report"] });
    },
  });

  return { mutate };
};
