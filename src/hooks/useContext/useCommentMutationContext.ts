import { CommentMutation } from "@/apis/reactQuery/Mutation/CommentMutation";
import { createSafeContext } from "./createSafeContext";

const commentMutation = new CommentMutation();

export const { Provider: CommentMutationProvider, useContext: useCommentMutationContext } = createSafeContext<{
  mutationFn: typeof commentMutation.postComment;
  parentId: string;
  onSuccessBehavior?: () => void;
}>();
