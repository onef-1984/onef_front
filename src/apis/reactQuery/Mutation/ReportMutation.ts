import { MutationFn } from "./MutationFn";
import { Response } from "@/types/util.types";
import { gql } from "graphql-request";
import {
  CreateReportMutation,
  CreateReportMutationVariables,
  DeleteReportMutation,
  DeleteReportMutationVariables,
  UpdateReportMutation,
  UpdateReportMutationVariables,
} from "@/types/graphql.types";

const CREATE_REPORT_MUTATION = gql`
  mutation CreateReport($BookInput: BookInput!, $ReportInput: ReportInput!) {
    book: createBook(bookInput: $BookInput) {
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

export class ReportMutation extends MutationFn {
  constructor() {
    super();
  }

  createReport({ BookInput, ReportInput }: CreateReportMutationVariables) {
    return () =>
      this.graphql<CreateReportMutation, CreateReportMutationVariables>(CREATE_REPORT_MUTATION, {
        variables: {
          BookInput,
          ReportInput,
        },
      });
  }

  updateReport({ ReportUpdateInput, ReportId }: UpdateReportMutationVariables) {
    return () =>
      this.graphql<UpdateReportMutation, UpdateReportMutationVariables>(UPDATE_REPORT_MUTATION, {
        variables: {
          ReportUpdateInput,
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

  reportLike(reportId: string) {
    return (method: "post" | "delete") => this.mutationFn<Response>(`/report/${reportId}/like`, method);
  }
}
