import { useMutation } from "@tanstack/react-query";
import { useCommentMutationContext } from "../useContext/useCommentMutationContext";

const useCommentMutation = ({ depth }: { depth: number }) => {
  const { parentId, mutationOptions } = useCommentMutationContext("useCommentMutation");

  const { mutate, isPending } = useMutation(mutationOptions);

  const onSubmit = ({ comment }: { comment: string }) => {
    mutate({ parentId, comment, depth });
  };

  return { onSubmit, isPending };
};

export default useCommentMutation;
