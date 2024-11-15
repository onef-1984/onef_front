import fetcher from "@/apis/axios";
import { CommentMutation } from "@/apis/reactQuery/Mutation/CommentMutation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCommentMutation = (id: string) => {
  const queryClient = useQueryClient();
  const commentMutation = new CommentMutation();

  const { mutate } = useMutation({
    mutationFn: commentMutation.deleteComment(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      toast.success("댓글이 삭제되었습니다.");
    },
  });

  const handleClick = () => {
    confirm("삭제하시겠습니까?");
    mutate({ parentId: id });
  };

  return { handleClick };
};
