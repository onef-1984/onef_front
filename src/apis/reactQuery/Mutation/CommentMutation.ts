import { MutationFn } from "./MutationFn";
import { Response } from "@/types/util.types";

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
    return ({ parentId }: { parentId: string }) => this.mutationFn<Response>(`/comments/${parentId}`, "delete");
  };
}
