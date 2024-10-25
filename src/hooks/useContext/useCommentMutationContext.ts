import { CommentMutation } from "@/apis/reactQuery/Mutation/CommentMutation";
import { createContext } from "react";

const commentMutation = new CommentMutation();

export const CommentMutationContext = createContext<{
  mutationFn: typeof commentMutation.postComment;
  parentId: string;
  onSuccessBehavior?: () => void;
}>({
  parentId: "",
  mutationFn: commentMutation.postComment,
});
