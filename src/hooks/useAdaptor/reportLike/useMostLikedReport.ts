import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";
import { useQuery } from "@tanstack/react-query";

export const useMostLikedReport = () => {
  const reportQuery = new ReportQuery();
  const { data } = useQuery(reportQuery.getMostLikedReportList());

  const items = data?.items ?? [];

  return { items };
};
