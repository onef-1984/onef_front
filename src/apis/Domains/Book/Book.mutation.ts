import { Mutation } from "@/apis/Base/Mutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { CreateReportMutationVariables, CreateReportMutation } from "@/types/graphql.types";
import { gql } from "graphql-request";

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

export class BookMutation extends Mutation {
  private router = useRouterAdv();

  postBook = (isbn13: CreateReportMutationVariables["isbn13"]) =>
    this.mutationOptions({
      mutationFn: (ReportInput: CreateReportMutationVariables["ReportInput"]) =>
        this.graphql<CreateReportMutation, CreateReportMutationVariables>(CREATE_REPORT_MUTATION, {
          isbn13,
          ReportInput,
        }),
      onSuccess: (data) => {
        this.router.push(`books/${data.book.isbn13}`);
      },
      onError: (error) => {
        console.log(error);
      },
    });
}
