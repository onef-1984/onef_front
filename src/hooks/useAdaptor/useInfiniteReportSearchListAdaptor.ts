import { useInfiniteQuery } from "@tanstack/react-query";
import { ReportRequest } from "@/apis/request/ReportRequest";
import { OrderBy, SearchType } from "@/types/graphql.types";

export const useInfiniteReportSearchListAdaptor = ({
  keyword,
  orderBy,
  searchType,
}: {
  keyword: string;
  orderBy: OrderBy;
  searchType: SearchType;
}) => {
  const reportRequest = new ReportRequest();
  const { data, fetchNextPage } = useInfiniteQuery(
    reportRequest.getReportListBySearch({ keyword, orderBy, searchType }),
  );

  const pages = data?.pages ?? [];

  return { pages, fetchNextPage };
};
