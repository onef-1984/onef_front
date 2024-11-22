import { gql } from "graphql-request";
import { GraphQL } from "@/apis/grahpqlClient";
import {
  CreateEditorsPickMutation,
  CreateEditorsPickMutationVariables,
  GetEditorsPickQuery,
  GetEditorsPickQueryVariables,
} from "@/types/graphql.types";

const GET_EDITORS_PICK = gql`
  query getEditorsPick {
    getEditorsPick {
      id
      description
      report {
        id
        title
        book {
          cover
        }
        user {
          nickname
        }
      }
    }
  }
`;

const CREATE_EDITORS_PICK = gql`
  mutation createEditorsPick($reportId: String!, $description: String!) {
    createEditorsPick(reportId: $reportId, description: $description) {
      message
    }
  }
`;

export class EditorsPickRequest extends GraphQL {
  constructor() {
    super();
  }

  queryKey = ["editorsPick"];

  getEditorsPick() {
    return {
      queryKey: [...this.queryKey],
      queryFn: () => this.graphql<GetEditorsPickQuery, GetEditorsPickQueryVariables>(GET_EDITORS_PICK),
    };
  }

  createEditorsPick(variables: CreateEditorsPickMutationVariables) {
    return () =>
      this.graphql<CreateEditorsPickMutation, CreateEditorsPickMutationVariables>(CREATE_EDITORS_PICK, {
        variables,
      });
  }
}
