import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Dispatch, FormEventHandler, SetStateAction, useContext } from "react";
import { CommentMutationContext } from "../useContext/useCommentMutationContext";
import { useRouterAdv } from "../useRouterAdv";

const useCommentMutation = ({
  value,
  setValue,
  initValue,
  depth,
}: {
  depth: number;
  initValue: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const queryClient = useQueryClient();
  const { parentId, mutationFn, onSuccessBehavior } = useContext(CommentMutationContext);
  const { push, pathWithoutHash } = useRouterAdv();

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
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (value === initValue || value === "") {
      // 댓글 수정일 경우 onSuccessBehavior 함수를 실행
      if (onSuccessBehavior) {
        return onSuccessBehavior();
        // 댓글 작성일 경우 value가 빈 문자열이면 return
      } else {
        return;
      }
    }

    mutate({ parentId, value, depth });
  };

  return { handleSubmit, isPending };
};

export default useCommentMutation;
