import { ReportQuery } from "@/apis/Domains/Report/Report.query";
import { useQuery } from "@tanstack/react-query";

export const useMostLikedReport = () => {
  const reportQuery = new ReportQuery();
  const { data } = useQuery(reportQuery.getMostLikedReportList());

  const items = data?.items.items ?? [];

  return { items };
};
