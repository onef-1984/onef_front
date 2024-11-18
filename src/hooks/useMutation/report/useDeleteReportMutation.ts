import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReportRequest } from "@/apis/request/ReportRequest";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { toast } from "react-hot-toast";

export const useDeleteReportMutation = () => {
  const { push, id: reportId } = useRouterAdv();

  const queryClient = useQueryClient();
  const reportRequest = new ReportRequest();

  const { mutate } = useMutation({
    mutationFn: reportRequest.deleteReport(reportId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
      toast.success("리포트가 삭제되었습니다.");
      push("/search");
    },
  });

  return { mutate };
};
