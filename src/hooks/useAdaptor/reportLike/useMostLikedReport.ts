import { ReportRequest } from "@/apis/request/ReportRequest";
import { useQuery } from "@tanstack/react-query";

export const useMostLikedReport = () => {
  const reportRequest = new ReportRequest();
  const { data } = useQuery(reportRequest.getMostLikedReportList());

  const items = data?.items.items ?? [];

  return { items };
};
