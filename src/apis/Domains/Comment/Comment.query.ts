import { Query } from "@/apis/Base/Query";
import { ReportComment } from "@/types/comment.types";
import { GetCommentsQueryVariables } from "@/types/graphql.types";
import { gql } from "graphql-request";

const CommentFragment = gql`
  fragment CommentFragment on Comment {
    id
    comment
    createdAt
    updatedAt
    reportId
    parentId
    user {
      id
      email
      nickname
      profileImage
      role
    }
  }
`;
const CommentRecursive = gql`
  fragment CommentRecursive on Comment {
    replies {
      ...CommentFragment
      replies {
        ...CommentFragment
        replies {
          ...CommentFragment
          replies {
            ...CommentFragment
          }
        }
      }
    }
  }
  ${CommentFragment}
`;

const GET_COMMENT = gql`
  query getComments($reportId: String!) {
    comments: getComments(parentId: $reportId) {
      comments {
        id
        comment
        createdAt
        updatedAt
        reportId
        parentId
        user {
          id
          email
          nickname
          profileImage
          role
        }
        ...CommentRecursive
      }
    }
  }
  ${CommentRecursive}
`;

export class CommentQuery extends Query {
  constructor() {
    super();
  }

  queryKey = ["comment"];

  getComments(reportId: string) {
    return {
      queryKey: [...this.queryKey, reportId],
      queryFn: () =>
        this.graphql<{ comments: { comments: ReportComment[] } }, GetCommentsQueryVariables>(GET_COMMENT, { reportId }),
    };
  }
}
