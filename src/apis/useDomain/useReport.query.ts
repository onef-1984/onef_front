import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ReportQuery } from "../Domains/Report/Report.query";
import { ReportQueryAdaptor } from "../Adaptor/Report.adaptor";
import { OrderBy, SearchType } from "@/types/graphql.types";

export const useReportQuery = () => {
  const GetReport = (reportId: string) => {
    const { data, ...res } = useQuery(new ReportQuery().getReport(reportId));
    return { ...res, data: ReportQueryAdaptor.getReport(data) };
  };

  const GetRecentReportList = () => {
    const { data, ...res } = useQuery(new ReportQuery().getRecentReportList());
    return { ...res, data: ReportQueryAdaptor.getRecentReportList(data) };
  };

  const GetMostLikedReportList = () => {
    const { data, ...res } = useQuery(new ReportQuery().getMostLikedReportList());
    return { ...res, data: ReportQueryAdaptor.getMostLikedReportList(data) };
  };

  const GetReportListBySearch = ({
    keyword,
    orderBy,
    searchType,
  }: {
    keyword: string;
    orderBy: OrderBy;
    searchType: SearchType;
  }) => {
    const { data, ...res } = useInfiniteQuery(
      new ReportQuery().getReportListBySearch({ keyword, orderBy, searchType }),
    );
    return { ...res, data: ReportQueryAdaptor.getReportListBySearch(data) };
  };

  const CheckUserLikedReport = (reportId: string) => {
    const { data, ...res } = useQuery(new ReportQuery().checkUserLikedReport(reportId));
    return { ...res, data: ReportQueryAdaptor.checkUserLikedReport(data) };
  };

  return { GetReport, GetRecentReportList, GetMostLikedReportList, GetReportListBySearch, CheckUserLikedReport };
};
