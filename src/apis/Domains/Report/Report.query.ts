import { Query } from "@/apis/Base/Query";
import { gql } from "graphql-request";
import { ALL_BOOK } from "../Book/Book.query";
import {
  GetMostLikedReportListQuery,
  GetMostLikedReportListQueryVariables,
  GetReportListBySearchQuery,
  GetReportListBySearchQueryVariables,
  OrderBy,
  SearchType,
  GetReportQueryVariables,
  CheckUserLikedReportQueryVariables,
} from "@/types/graphql.types";
import { ReportQueryAdaptor } from "@/apis/Adaptor/Report.adaptor";

export const ALL_REPORT = gql`
  fragment AllReport on Report {
    id
    title
    content
    tags
    createdAt
    updatedAt
  }
`;

const GET_REPORT = gql`
  query getReport($reportId: String!) {
    report: getReport(reportId: $reportId) {
      ...AllReport
      user {
        id
        nickname
      }
      _count {
        userLiked
      }
      book {
        ...AllBook
        subInfo {
          itemPage
        }
      }
    }
  }
  ${ALL_REPORT}
  ${ALL_BOOK}
`;

const GET_REPORT_LIST_BY_SEARCH = gql`
  query getReportListBySearch($SearchReportInput: SearchReportInput!) {
    reportList: getReportListBySearch(query: $SearchReportInput) {
      hasNext
      items {
        ...AllReport
        user {
          id
          nickname
        }
        _count {
          userLiked
        }
        book {
          cover
          title
        }
      }
    }
  }
  ${ALL_REPORT}
`;

const GET_MOST_LIKED_REPORT_LIST = gql`
  query getMostLikedReportList {
    items: getMostLikedReportList {
      items {
        ...AllReport
        user {
          id
          nickname
        }
        _count {
          userLiked
        }
        book {
          cover
          title
        }
      }
    }
  }
  ${ALL_REPORT}
`;

const IS_USER_LIKED_REPORT = gql`
  query checkUserLikedReport($ReportId: String!) {
    isLiked: checkUserLikedReport(reportId: $ReportId) {
      isLiked
    }
  }
`;

export class ReportQuery extends Query {
  queryKey = ["report"];

  getMostLikedReportList() {
    return {
      queryKey: [...this.queryKey, "mostLiked"],
      queryFn: () =>
        this.graphql<GetMostLikedReportListQuery, GetMostLikedReportListQueryVariables>(GET_MOST_LIKED_REPORT_LIST),
    };
  }

  getRecentReportList() {
    return {
      queryKey: [...this.queryKey, "mostRecent"],
      queryFn: () =>
        this.graphql<GetReportListBySearchQuery, GetReportListBySearchQueryVariables>(GET_REPORT_LIST_BY_SEARCH, {
          SearchReportInput: {
            keyword: "",
            orderBy: OrderBy.CreatedAt,
            searchType: SearchType.Report,
            take: 12,
            skip: 0,
          },
        }),
    };
  }

  getUserLatestReportList(userId: string) {
    return {
      queryKey: [...this.queryKey, userId, "userLatest"],
      queryFn: () =>
        this.graphql<GetReportListBySearchQuery, GetReportListBySearchQueryVariables>(GET_REPORT_LIST_BY_SEARCH, {
          SearchReportInput: {
            keyword: userId,
            orderBy: OrderBy.CreatedAt,
            searchType: SearchType.User,
            take: 5,
            skip: 0,
          },
        }),
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
      queryKey: [...this.queryKey, orderBy, keyword ? keyword : "all", searchType],
      queryFn: ({ pageParam }: { pageParam: GetReportListBySearchQueryVariables }) =>
        this.graphql<GetReportListBySearchQuery, GetReportListBySearchQueryVariables>(
          GET_REPORT_LIST_BY_SEARCH,
          pageParam,
        ),
      initialPageParam: {
        SearchReportInput: {
          keyword,
          orderBy,
          searchType,
          take: 12,
          skip: 0,
        },
      },
      getNextPageParam: (
        lastPage: GetReportListBySearchQuery,
        _: any,
        lastPageParam: GetReportListBySearchQueryVariables,
      ) => {
        return {
          SearchReportInput: {
            keyword,
            orderBy,
            searchType,
            take: 12,
            skip: lastPage.reportList?.hasNext ? lastPageParam.SearchReportInput.skip + 12 : NaN,
          },
        };
      },
    };
  }

  getReport = (reportId: string) => ({
    queryKey: [...this.queryKey, reportId],
    queryFn: () =>
      this.graphql<ReturnType<typeof ReportQueryAdaptor.getReport>, GetReportQueryVariables>(GET_REPORT, {
        reportId,
      }),
    // enabled: !!reportId,
  });

  checkUserLikedReport(ReportId: string) {
    return {
      queryKey: [...this.queryKey, ReportId, "like"],
      queryFn: () =>
        this.graphql<ReturnType<typeof ReportQueryAdaptor.checkUserLikedReport>, CheckUserLikedReportQueryVariables>(
          IS_USER_LIKED_REPORT,
          {
            ReportId,
          },
        ),
    };
  }
}
