import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouterAdv } from "../useRouterAdv";

export const useInfiniteReportSearchListAdaptor = () => {
  const { keyword, orderBy, searchType } = useRouterAdv();

  const reportQuery = new ReportQuery();
  const { data, fetchNextPage } = useInfiniteQuery(reportQuery.getReportListBySearch({ keyword, orderBy, searchType }));

  return { pages: data?.pages, fetchNextPage, hasNext: data?.pages.at(-1)?.hasNext };
};
