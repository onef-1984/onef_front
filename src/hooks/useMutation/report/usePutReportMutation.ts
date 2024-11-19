import { ReportRequest } from "@/apis/request/ReportRequest";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePutReportMutation = () => {
  const { id: reportId, push } = useRouterAdv();

  const [_, setTagList] = useReportTagList();

  const queryClient = useQueryClient();
  const reportRequest = new ReportRequest();

  const { mutate } = useMutation({
    mutationFn: reportRequest.updateReport(reportId),
    onSuccess: () => {
      toast.success("리뷰가 수정되었습니다.");
      setTagList([]);
      queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
      push(`/report/${reportId}`);
    },
  });

  return { mutate };
};
