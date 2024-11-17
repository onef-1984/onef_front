import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { toast } from "react-hot-toast";

export const useDeleteReportMutation = () => {
  const { push, id: reportId } = useRouterAdv();

  const queryClient = useQueryClient();
  const reportMutation = new ReportMutation();

  const { mutate } = useMutation({
    mutationFn: reportMutation.deleteReport(reportId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
      toast.success("리포트가 삭제되었습니다.");
      push("/search");
    },
  });

  return { mutate };
};
