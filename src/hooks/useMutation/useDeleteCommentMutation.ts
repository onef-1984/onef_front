import { CommentMutation } from "@/apis/Domains/Comment/Comment.mutation";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCommentMutation = (id: string) => {
  const commentMutation = new CommentMutation();

  const { mutate } = useMutation(commentMutation.deleteComment());

  const handleClick = () => {
    confirm("삭제하시겠습니까?");
    mutate({ id });
  };

  return { handleClick };
};
