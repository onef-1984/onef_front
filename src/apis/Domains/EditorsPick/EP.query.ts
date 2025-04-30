import { EPQueryAdaptor } from "@/apis/Adaptor/EP.adaptor";
import { Query } from "@/apis/Base/Query";
import { GetEditorsPickQueryVariables } from "@/types/graphql.types";
import { gql } from "graphql-request";

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

export class EPQuery extends Query {
  constructor() {
    super();
  }

  queryKey = ["editorsPick"];

  getEditorsPick = () => ({
    queryKey: [...this.queryKey],
    queryFn: () =>
      this.graphql<ReturnType<typeof EPQueryAdaptor.getEditorsPick>, GetEditorsPickQueryVariables>(GET_EDITORS_PICK),
  });
}
