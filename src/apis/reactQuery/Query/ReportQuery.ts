import { GetReport, GetReportList } from "@/types/report.types";
import { QueryFn } from "./QueryFn";
import { OrderBy, SearchType } from "@/types/util.types";

export class ReportQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["report"];

  getReport(reviewId: string) {
    return {
      queryKey: [...this.queryKey, reviewId],
      queryFn: this.queryFn<GetReport>(`/report/${reviewId}`),
      enabled: !!reviewId,
    };
  }

  getReportListBySearch({
    keyword,
    orderBy,
    searchType,
  }: {
    keyword: string;
    orderBy: OrderBy;
    searchType: SearchType;
  }) {
    return {
      queryKey: [...this.queryKey, keyword, orderBy],
      queryFn: this.infiniteQueryFn<GetReportList>(
        `/report/search?take=12&searchType=${searchType}&keyword=${keyword}&orderBy=${orderBy}`
      ),
      initialPageParam: 0,
      getNextPageParam: (lastPage: GetReportList, allPages: any, lastPageParam: number) =>
        lastPage.hasNext ? lastPageParam + 1 : undefined,
    };
  }
}
