import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useCommentMutationContext } from "../useContext/useCommentMutationContext";
import { useRouterAdv } from "../useRouterAdv";

const useCommentMutation = ({ initValue, depth }: { depth: number; initValue: string }) => {
  const queryClient = useQueryClient();
  const { parentId, mutationFn, onSuccessBehavior } = useCommentMutationContext("useCommentMutation");
  const { push, pathWithoutHash } = useRouterAdv();

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFn(),
    onSuccess: () => {
      if (onSuccessBehavior) {
        onSuccessBehavior();
      }

      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onSettled: (data) => {
      push(pathWithoutHash + `#${data?.id}`);
    },
  });

  const onSubmit = ({ comment }: { comment: string }) => {
    if (comment === initValue || comment === "") {
      // 댓글 수정일 경우 onSuccessBehavior 함수를 실행
      if (onSuccessBehavior) {
        return onSuccessBehavior();
        // 댓글 작성일 경우 value가 빈 문자열이면 return
      } else {
        return;
      }
    }

    mutate({ parentId, value: comment, depth });
  };

  return { onSubmit, isPending };
};

export default useCommentMutation;
