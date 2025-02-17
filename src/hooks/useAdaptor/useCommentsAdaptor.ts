import { CommentQuery } from "@/apis/Domains/Comment/Comment.query";
import { ReportComment } from "@/types/comment.types";
import { useQuery } from "@tanstack/react-query";

const useCommentsAdaptor = (id: string) => {
  const commentQuery = new CommentQuery();
  const { data } = useQuery(commentQuery.getComments(id));

  const comments = data?.comments ?? ([] as unknown as ReportComment[]);

  return { comments };
};

export default useCommentsAdaptor;
