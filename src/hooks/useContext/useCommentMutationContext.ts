import { CommentMutation } from "@/apis/reactQuery/Mutation/CommentMutation";
import { createContext } from "react";

const commentMutation = new CommentMutation();

export const CommentMutationContext = createContext<{
  inputName: string;
  buttonName: string;
  depth: number;
  mutationFn: typeof commentMutation.postComment;
  parentId: string;
  onSuccessBehavior?: () => void;
}>({
  inputName: "댓글",
  buttonName: "저장",
  parentId: "",
  depth: 0,
  mutationFn: commentMutation.postComment,
});
