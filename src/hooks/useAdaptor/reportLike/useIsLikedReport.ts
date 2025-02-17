import { useQuery } from "@tanstack/react-query";
import { useRouterAdv } from "../../useRouterAdv";
import { ReportQuery } from "@/apis/Domains/Report/Report.query";

export const useIsLikedReport = () => {
  const { id: reportId } = useRouterAdv();
  const reportQuery = new ReportQuery();
  const { data } = useQuery(reportQuery.checkUserLikedReport(reportId));

  return {
    isLiked: data?.isLiked.isLiked ?? false,
  };
};
