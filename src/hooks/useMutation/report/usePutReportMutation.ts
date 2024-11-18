import { ReportRequest } from "@/apis/request/ReportRequest";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { initValue, setForm, FormState } from "@/hooks/useSicilian/report";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePutReportMutation = () => {
  const { id: reportId, push } = useRouterAdv();

  const [tagList, setTagList] = useReportTagList();

  const queryClient = useQueryClient();
  const reportRequest = new ReportRequest();

  const { mutate } = useMutation({
    mutationFn: reportRequest.updateReport({
      ReportUpdateInput: {
        ...FormState(),
        tags: tagList,
      },
      ReportId: reportId,
    }),
    onSuccess: () => {
      toast.success("리뷰가 수정되었습니다.");
      setTagList([]);
      setForm(initValue);
      queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
      push(`/report/${reportId}`);
    },
  });

  return { mutate };
};
