import { useInfiniteQuery } from "@tanstack/react-query";
import { OrderBy, SearchType } from "@/types/graphql.types";
import { ReportQuery } from "@/apis/Domains/Report/Report.query";

export const useInfiniteReportSearchListAdaptor = ({
  keyword,
  orderBy,
  searchType,
}: {
  keyword: string;
  orderBy: OrderBy;
  searchType: SearchType;
}) => {
  const reportQuery = new ReportQuery();
  const { data, fetchNextPage } = useInfiniteQuery(reportQuery.getReportListBySearch({ keyword, orderBy, searchType }));

  const pages = data?.pages ?? [];

  return { pages, fetchNextPage };
};
