import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ReportQuery } from "../Domains/Report/Report.query";
import { withAdaptor } from "../Decorator/withQuery";
import { ReportQueryAdaptor } from "../Adaptor/Report.adaptor";
import { OrderBy, SearchType } from "@/types/graphql.types";

export class useReportQuery {
  private reportQuery = new ReportQuery();

  @withAdaptor(ReportQueryAdaptor.getReport)
  getReport = (reportId: string) => useQuery(this.reportQuery.getReport(reportId));

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

  @withAdaptor(ReportQueryAdaptor.checkUserLikedReport)
  checkUserLikedReport = (reportId: string) => useQuery(this.reportQuery.checkUserLikedReport(reportId));
}
