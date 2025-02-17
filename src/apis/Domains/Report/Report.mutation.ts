import { gql } from "graphql-request";
import { Mutation } from "@/apis/Base/Mutation";
import {
  CreateReportMutationVariables,
  CreateReportMutation,
  UpdateReportMutationVariables,
  UpdateReportMutation,
  DeleteReportMutation,
  DeleteReportMutationVariables,
  ToggleReportLikeMutation,
  ToggleReportLikeMutationVariables,
} from "@/types/graphql.types";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { Dispatch, SetStateAction } from "react";

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

export class ReportMutation extends Mutation {
  private queryClient = useQueryClient();
  private router = useRouterAdv();

  createReport(setTagList: Dispatch<SetStateAction<Array<string>>>) {
    return this.mutationOptions({
      mutationFn: (ReportInput: CreateReportMutationVariables["ReportInput"]) =>
        this.graphql<CreateReportMutation, CreateReportMutationVariables>(CREATE_REPORT_MUTATION, {
          isbn13: this.router.id,
          ReportInput,
        }),
      onSuccess: (data) => {
        toast.success("리뷰가 작성되었습니다.");
        this.router.push(`/report/${data.report.id}`);
        setTagList([]);
      },
    });
  }

  updateReport(setTagList: Dispatch<SetStateAction<Array<string>>>) {
    return this.mutationOptions({
      mutationFn: ({ title, content, tags }: UpdateReportMutationVariables["ReportUpdateInput"]) =>
        this.graphql<UpdateReportMutation, UpdateReportMutationVariables>(UPDATE_REPORT_MUTATION, {
          ReportUpdateInput: { title, content, tags },
          ReportId: this.router.id,
        }),
      onSuccess: () => {
        toast.success("리뷰가 수정되었습니다.");
        setTagList([]);
        this.queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
        this.router.push(`/report/${this.router.id}`);
      },
    });
  }

  deleteReport() {
    return this.mutationOptions({
      mutationFn: () =>
        this.graphql<DeleteReportMutation, DeleteReportMutationVariables>(DELETE_REPORT_MUTATION, {
          ReportId: this.router.id,
        }),
      onSuccess: async () => {
        await this.queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
        toast.success("리포트가 삭제되었습니다.");
        this.router.push("/search");
      },
    });
  }

  toggleReportLike() {
    return this.mutationOptions({
      mutationFn: () =>
        this.graphql<ToggleReportLikeMutation, ToggleReportLikeMutationVariables>(TOGGLE_REPORT_LIKE, {
          ReportId: this.router.id,
        }),
      onSuccess: ({ message: { message } }) => {
        this.queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
        toast.success(message);
      },
      onError: () => {
        toast.error("좋아요에 실패했습니다.");
      },
    });
  }
}
