import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Dispatch, FormEventHandler, SetStateAction, useContext } from "react";
import { CommentMutationContext } from "../useContext/useCommentMutationContext";
import { useRouterAdv } from "../useRouterAdv";

const useCommentMutation = ({ value, setValue }: { value: string; setValue: Dispatch<SetStateAction<string>> }) => {
  const queryClient = useQueryClient();
  const { parentId, depth, mutationFn, onSuccessBehavior } = useContext(CommentMutationContext);
  const { push, pathWithoutHash} = useRouterAdv()

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFn(),
    onSuccess: () => {
      setValue("");

      if (onSuccessBehavior) {
        onSuccessBehavior();
      }

      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onSettled: (data) => {
      push(pathWithoutHash + `#${data?.id}`);
    }
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    mutate({ parentId, value, depth });
  };

  return { handleSubmit, isPending };
};

export default useCommentMutation;
