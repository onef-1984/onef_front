import { useRouteId } from "../../useRouteId";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";

import { useRouter } from "next/router";

export const useDeleteReportMutation = () => {
  const { push } = useRouter();

  const queryClient = useQueryClient();

  const reportId = useRouteId() as string;
  const reportMutation = new ReportMutation();

  const { mutate } = useMutation({
    mutationFn: () => reportMutation.deleteReport()(reportId),
    onSuccess: () => {
      alert("리뷰가 삭제되었습니다.");
      push("/");
      queryClient.invalidateQueries({ queryKey: ["report", reportId] });
    },
  });

  return { mutate };
};
