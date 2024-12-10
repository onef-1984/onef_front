import { GraphQL } from "@/apis/grahpqlClient";
import { gql } from "graphql-request";
import { ALL_BOOK } from "./BookRequest";
import {
  CheckUserLikedReportQuery,
  CheckUserLikedReportQueryVariables,
  CreateReportMutation,
  CreateReportMutationVariables,
  DeleteReportMutation,
  DeleteReportMutationVariables,
  GetMostLikedReportListQuery,
  GetMostLikedReportListQueryVariables,
  GetReportListBySearchQuery,
  GetReportListBySearchQueryVariables,
  GetReportQuery,
  GetReportQueryVariables,
  OrderBy,
  SearchType,
  ToggleReportLikeMutation,
  ToggleReportLikeMutationVariables,
  UpdateReportMutation,
  UpdateReportMutationVariables,
} from "@/types/graphql.types";

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

const CREATE_REPORT_MUTATION = gql`
  mutation CreateReport($isbn13: String!, $ReportInput: ReportInput!) {
    book: createBook(isbn13: $isbn13) {
      isbn13
    }
    report: createReport(reportInput: $ReportInput) {
      id
    }
  }
`;

const UPDATE_REPORT_MUTATION = gql`
  mutation UpdateReport($ReportUpdateInput: ReportUpdateInput!, $ReportId: String!) {
    report: updateReport(reportUpdateInput: $ReportUpdateInput, reportId: $ReportId) {
      id
    }
  }
`;

const DELETE_REPORT_MUTATION = gql`
  mutation DeleteReport($ReportId: String!) {
    report: deleteReport(reportId: $ReportId) {
      id
    }
  }
`;

const TOGGLE_REPORT_LIKE = gql`
  mutation toggleReportLike($ReportId: String!) {
    message: toggleReportLike(reportId: $ReportId) {
      message
    }
  }
`;

const IS_USER_LIKED_REPORT = gql`
  query checkUserLikedReport($ReportId: String!) {
    isLiked: checkUserLikedReport(reportId: $ReportId) {
      isLiked
    }
  }
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

export class ReportRequest extends GraphQL {
  constructor() {
    super();
  }
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
          variables: {
            SearchReportInput: {
              keyword: "",
              orderBy: OrderBy.CreatedAt,
              searchType: SearchType.Report,
              take: 12,
              skip: 0,
            },
          },
        }),
    };
  }

  getUserLatestReportList(userId: string) {
    return {
      queryKey: [...this.queryKey, userId, "userLatest"],
      queryFn: () =>
        this.graphql<GetReportListBySearchQuery, GetReportListBySearchQueryVariables>(GET_REPORT_LIST_BY_SEARCH, {
          variables: {
            SearchReportInput: {
              keyword: userId,
              orderBy: OrderBy.CreatedAt,
              searchType: SearchType.User,
              take: 5,
              skip: 0,
            },
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
        this.infiniteGraphql<GetReportListBySearchQuery, GetReportListBySearchQueryVariables>(
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

  getReport(reviewId: string) {
    return {
      queryKey: [...this.queryKey, reviewId],
      queryFn: () =>
        this.graphql<GetReportQuery, GetReportQueryVariables>(GET_REPORT, { variables: { reportId: reviewId } }),
      enabled: !!reviewId,
    };
  }

  createReport(isbn13: CreateReportMutationVariables["isbn13"]) {
    return (ReportInput: CreateReportMutationVariables["ReportInput"]) =>
      this.graphql<CreateReportMutation, CreateReportMutationVariables>(CREATE_REPORT_MUTATION, {
        variables: {
          isbn13,
          ReportInput,
        },
      });
  }

  updateReport(ReportId: UpdateReportMutationVariables["ReportId"]) {
    return ({ title, content, tags }: UpdateReportMutationVariables["ReportUpdateInput"]) =>
      this.graphql<UpdateReportMutation, UpdateReportMutationVariables>(UPDATE_REPORT_MUTATION, {
        variables: {
          ReportUpdateInput: { title, content, tags },
          ReportId,
        },
      });
  }

  deleteReport(ReportId: string) {
    return () =>
      this.graphql<DeleteReportMutation, DeleteReportMutationVariables>(DELETE_REPORT_MUTATION, {
        variables: {
          ReportId,
        },
      });
  }

  toggleReportLike(ReportId: string) {
    return () =>
      this.graphql<ToggleReportLikeMutation, ToggleReportLikeMutationVariables>(TOGGLE_REPORT_LIKE, {
        variables: { ReportId },
      });
  }

  checkUserLikedReport(ReportId: string) {
    return {
      queryKey: [...this.queryKey, ReportId, "like"],
      queryFn: () =>
        this.graphql<CheckUserLikedReportQuery, CheckUserLikedReportQueryVariables>(IS_USER_LIKED_REPORT, {
          variables: { ReportId },
        }),
    };
  }
}
