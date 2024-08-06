import { useQuery } from "@tanstack/react-query";
import { useRouterAdv } from "../useRouterAdv";
import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";

export const useIsLikedReport = () => {
  const { id: reportId } = useRouterAdv();
  const reportQuery = new ReportQuery();
  const { data } = useQuery(reportQuery.checkReportLike(reportId));

  return {
    isLiked: data?.isLiked ?? false,
  };
};
