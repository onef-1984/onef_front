import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";
import { useRouterAdv } from "../useRouterAdv";

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  const authMutation = new AuthMutation();
  const { push, asPath } = useRouterAdv();

  const { mutate } = useMutation({
    mutationFn: authMutation.deleteSignOut(),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"] });
      push(asPath);
    },
  });

  return { mutate };
};
