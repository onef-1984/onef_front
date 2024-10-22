import { CommentQuery } from "@/apis/reactQuery/Query/CommentQuery";
import { useQuery } from "@tanstack/react-query";

const useCommentsAdaptor = (id: string) => {
  const commentQuery = new CommentQuery();
  const { data } = useQuery(commentQuery.getComments(id));

  const { comments } = data ?? { comments: [] };

  return { comments };
};

export default useCommentsAdaptor;
