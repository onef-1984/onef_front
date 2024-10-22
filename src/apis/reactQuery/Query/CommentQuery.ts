import { ReportComment, ReportCommentList } from "@/types/comment.types";
import { QueryFn } from "./QueryFn";

export class CommentQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["comment"];

  getComment(id: string) {
    return {
      queryKey: [...this.queryKey, id],
      queryFn: this.queryFn<ReportComment>(`/comment/${id}`),
    };
  }

  getComments(id: string) {
    return {
      queryKey: [...this.queryKey, id],
      queryFn: this.queryFn<ReportCommentList>(`/comments/${id}`),
    };
  }
}
