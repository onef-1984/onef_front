import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouterAdv } from "../../useRouterAdv";
import { ReportRequest } from "@/apis/request/ReportRequest";
import toast from "react-hot-toast";

export const useReportLikesMutation = () => {
  const { id: reportId } = useRouterAdv();
  const queryClient = useQueryClient();
  const reportRequest = new ReportRequest();

  // TODO: 낙관적 업데이트 필요
  const { mutate, isPending } = useMutation({
    mutationFn: reportRequest.toggleReportLike(reportId),
    onSuccess: ({ message: { message } }) => {
      queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
      toast.success(message);
    },
    onError: (error) => {
      toast.error("좋아요에 실패했습니다.");
    },
  });

  return { mutate, isPending };
};
