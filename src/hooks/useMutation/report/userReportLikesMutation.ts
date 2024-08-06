import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouterAdv } from "../../useRouterAdv";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import toast from "react-hot-toast";

export const useReportLikesMutation = () => {
  const { id: reportId } = useRouterAdv();
  const queryClient = useQueryClient();
  const reportMutation = new ReportMutation();

  // TODO: 낙관적 업데이트 필요
  const { mutate, isPending } = useMutation({
    mutationFn: reportMutation.reportLike(reportId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["report", reportId] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error("좋아요에 실패했습니다.");
    },
  });

  return { mutate, isPending };
};
