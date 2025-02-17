import { Mutation } from "@/apis/Base/Mutation";
import { CreateEditorsPickMutation, CreateEditorsPickMutationVariables } from "@/types/graphql.types";
import { gql } from "graphql-request";

const CREATE_EDITORS_PICK = gql`
  mutation createEditorsPick($reportId: String!, $description: String!) {
    createEditorsPick(reportId: $reportId, description: $description) {
      message
    }
  }
`;

// 미구현 상태
export class EPMutation extends Mutation {
  constructor() {
    super();
  }

  createEditorsPick(variables: CreateEditorsPickMutationVariables) {
    return () =>
      this.graphql<CreateEditorsPickMutation, CreateEditorsPickMutationVariables>(CREATE_EDITORS_PICK, variables);
  }
}
