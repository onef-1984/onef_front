import { ReportRequest } from "@/apis/request/ReportRequest";
import { useQuery } from "@tanstack/react-query";

export const useRecentReport = () => {
  const reportRequest = new ReportRequest();
  const { data } = useQuery(reportRequest.getRecentReportList());

  const items = data?.reportList.items ?? [];

  return { items };
};
