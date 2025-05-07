/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { CommentQuery } from "../Domains/Comment/Comment.query";
import { thisBind } from "../Decorator/thisBind";

@thisBind
export class useCommentQuery {
  private commentQuery = new CommentQuery();

  getComment(reportId: string) {
    return useQuery(this.commentQuery.getComments(reportId));
  }
}
