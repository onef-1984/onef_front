import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouteId } from "@/hooks/useRouteId";
import { initValue, setValue } from "@/hooks/useSicilian/report";
import { CreateReport } from "@/types/report.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const usePutReportMutation = () => {
  const { push } = useRouter();
  const reportId = useRouteId() as string;

  const [tagList, setTagList] = useReportTagList();

  const queryClient = useQueryClient();

  const reportMutation = new ReportMutation();

  const { mutate } = useMutation({
    mutationFn: reportMutation.putReport(reportId),
    onSuccess: () => {
      alert("리뷰가 수정되었습니다.");
      setTagList([]);
      setValue(initValue);
      queryClient.invalidateQueries({ queryKey: ["report", reportId] });
      push(`/report/${reportId}`);
    },
  });

  return { mutate };
};
