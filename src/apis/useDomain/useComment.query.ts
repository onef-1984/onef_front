import { useQuery } from "@tanstack/react-query";
import { CommentQuery } from "../Domains/Comment/Comment.query";

export class useCommentQuery {
  private commentQuery = new CommentQuery();

  getComment = (reportId: string) => useQuery(this.commentQuery.getComments(reportId));
}
