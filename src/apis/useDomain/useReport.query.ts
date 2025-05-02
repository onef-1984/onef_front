/* eslint-disable react-hooks/rules-of-hooks */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ReportQuery } from "../Domains/Report/Report.query";
import { transformResult } from "../Decorator/transformResult";
import { ReportQueryAdaptor } from "../Adaptor/Report.adaptor";
import { OrderBy, SearchType } from "@/types/graphql.types";
import { thisBind } from "../Decorator/thisBind";

@thisBind
export class useReportQuery {
  private reportQuery = new ReportQuery();

  @transformResult(ReportQueryAdaptor.getReport)
  getReport(reportId: string) {
    return useQuery(this.reportQuery.getReport(reportId));
  }

  getRecentReportList = () => useQuery(this.reportQuery.getRecentReportList());

  getMostLikedReportList = () => useQuery(this.reportQuery.getMostLikedReportList());

  getReportListBySearch = ({
    keyword,
    orderBy,
    searchType,
  }: {
    keyword: string;
    orderBy: OrderBy;
    searchType: SearchType;
  }) => useInfiniteQuery(this.reportQuery.getReportListBySearch({ keyword, orderBy, searchType }));

  @transformResult(ReportQueryAdaptor.checkUserLikedReport)
  checkUserLikedReport(reportId: string) {
    return useQuery(this.reportQuery.checkUserLikedReport(reportId));
  }
}
