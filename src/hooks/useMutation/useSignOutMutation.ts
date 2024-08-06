import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  const authMutation = new AuthMutation();

  const { mutate } = useMutation({
    mutationFn: authMutation.deleteSignOut(),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"] });
    },
  });

  return { mutate };
};
