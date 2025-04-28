import { AuthMutation } from "@/apis/Domains/AuthMutation";
import { useMutation } from "@tanstack/react-query";

export function useAuthMutator(url: string = "") {
  const authMutation = new AuthMutation();

  const { mutate: postSocialSignMutate } = useMutation(authMutation.postSocialSign());
  const { mutate: deleteSignOutMutate } = useMutation(authMutation.deleteSignOut());
  const { mutate: postSignMutate, isPending: postSignIsPending } = useMutation(authMutation.postSign(url));

  return { postSocialSignMutate, deleteSignOutMutate, postSignMutate, postSignIsPending };
}
