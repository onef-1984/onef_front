import { Mutation } from "@/apis/Base/Mutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import {
  Comment,
  CreateComment,
  CreateCommentMutation,
  CreateCommentMutationVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
  PutCommentMutation,
  PutCommentMutationVariables,
} from "@/types/graphql.types";
import { useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import toast from "react-hot-toast";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($createComment: CreateComment!) {
    comment: createComment(createComment: $createComment) {
      id
    }
  }
`;

const CHANGE_COMMENT_MUTATION = gql`
  mutation putComment($id: String!, $comment: String!) {
    putComment(id: $id, comment: $comment) {
      message
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id) {
      message
    }
  }
`;

export class CommentMutation extends Mutation {
  private queryClient = useQueryClient();
  private router = useRouterAdv();

  postComment = (onSuccessBehavior?: () => void) =>
    this.mutationOptions({
      mutationFn: (createComment: CreateComment) => {
        return this.graphql<CreateCommentMutation, CreateCommentMutationVariables>(CREATE_COMMENT_MUTATION, {
          createComment,
        });
      },
      onSuccess: () => {
        if (onSuccessBehavior) {
          onSuccessBehavior();
        }
        this.queryClient.invalidateQueries({ queryKey: ["comment"] });
      },
      onSettled: (data) => {
        this.router.push(this.router.pathWithoutHash + `#${data?.comment.id}`);
      },
    });

  putComment = (onSuccessBehavior?: () => void) =>
    this.mutationOptions({
      mutationFn: ({ comment }: { comment: Comment }) =>
        this.graphql<PutCommentMutation, PutCommentMutationVariables>(CHANGE_COMMENT_MUTATION, comment),
      onSuccess: () => {
        if (onSuccessBehavior) {
          onSuccessBehavior();
        }
        this.queryClient.invalidateQueries({ queryKey: ["comment"] });
      },
    });

  deleteComment = () =>
    this.mutationOptions({
      mutationFn: ({ id }: { id: string }) =>
        this.graphql<DeleteCommentMutation, DeleteCommentMutationVariables>(DELETE_COMMENT_MUTATION, { id }),
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: ["comment"] });
        toast.success("댓글이 삭제되었습니다.");
      },
    });
}
