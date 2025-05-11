import { useQuery } from "@tanstack/react-query";
import { CommentQuery } from "../Domains/Comment/Comment.query";

export const useCommentQuery = () => {
  const GetComment = (reportId: string) => {
    const { data = { comments: { comments: [] } }, ...res } = useQuery(new CommentQuery().getComments(reportId));
    return { ...res, data };
  };

  return { GetComment };
};
