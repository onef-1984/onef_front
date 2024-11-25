import { useQuery } from "@tanstack/react-query";
import { useRouterAdv } from "../../useRouterAdv";
import { ReportRequest } from "@/apis/request/ReportRequest";

export const useIsLikedReport = () => {
  const { id: reportId } = useRouterAdv();
  const reportRequest = new ReportRequest();
  const { data } = useQuery(reportRequest.checkUserLikedReport(reportId));

  return {
    isLiked: data?.isLiked.isLiked ?? false,
  };
};
