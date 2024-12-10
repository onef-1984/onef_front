import { ReportRequest } from "@/apis/request/ReportRequest";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePostReportMutation = () => {
  // isbn13 값을 가져옴
  const { id: isbn13, push } = useRouterAdv();
  const [_, setTagList] = useReportTagList();

  const reportRequest = new ReportRequest();
  const { mutate } = useMutation({
    mutationFn: reportRequest.createReport(isbn13),
    onSuccess: (data) => {
      toast.success("리뷰가 작성되었습니다.");
      push(`/report/${data.report.id}`);
      setTagList([]);
    },
  });

  return {
    mutate,
  };
};
