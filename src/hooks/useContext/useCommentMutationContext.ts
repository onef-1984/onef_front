import { createSafeContext } from "./createSafeContext";
import { UseMutationOptions } from "@tanstack/react-query";

export const { Provider: CommentMutationProvider, useContext: useCommentMutationContext } = createSafeContext<{
  mutationOptions: UseMutationOptions<any, Error, any>;
  parentId: string;
}>();
