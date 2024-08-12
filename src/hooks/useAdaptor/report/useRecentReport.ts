import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";
import { useQuery } from "@tanstack/react-query";

export const useRecentReport = () => {
  const reportQuery = new ReportQuery();
  const { data } = useQuery(reportQuery.getRecentReportList());

  const items = data?.items ?? [];

  return { items };
};
