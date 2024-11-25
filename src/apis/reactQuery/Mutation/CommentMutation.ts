import { Message } from "@/types/graphql.types";
import { MutationFn } from "./MutationFn";

export class CommentMutation extends MutationFn {
  constructor() {
    super();
  }

  postComment = () => {
    return ({ parentId, value, depth }: { parentId: string; value: string; depth: number }) =>
      this.mutationFn<{ id: string }>(`/comments/${parentId}`, "post", { comment: value, depth });
  };

  putComment = () => {
    return ({ parentId, value, depth }: { parentId: string; value: string; depth: number }) =>
      this.mutationFn<{ id: string }>(`/comments/${parentId}`, "put", { comment: value, depth });
  };

  deleteComment = () => {
    return ({ parentId }: { parentId: string }) => this.mutationFn<Message>(`/comments/${parentId}`, "delete");
  };
}
