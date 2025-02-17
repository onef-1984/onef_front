import { ReportQuery } from "@/apis/Domains/Report/Report.query";
import { useQuery } from "@tanstack/react-query";

export const useRecentReport = () => {
  const reportQuery = new ReportQuery();
  const { data } = useQuery(reportQuery.getRecentReportList());

  const items = data?.reportList.items ?? [];

  return { items };
};
