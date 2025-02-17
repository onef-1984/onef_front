import { CommentQuery } from "@/apis/Domains/Comment/Comment.query";
import { useQuery } from "@tanstack/react-query";

const useCommentsAdaptor = (id: string) => {
  const commentQuery = new CommentQuery();
  const { data } = useQuery(commentQuery.getComments(id));

  const { comments } = data?.comments ?? { comments: [] };

  return { comments };
};

export default useCommentsAdaptor;
