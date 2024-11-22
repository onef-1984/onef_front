import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";
import { useMutation } from "@tanstack/react-query";
import { useRouterAdv } from "../useRouterAdv";
import toast from "react-hot-toast";
import { GraphQLError } from "graphql";

export const useSignMutation = (url: string) => {
  const { push } = useRouterAdv();
  const authQuery = new AuthMutation();

  const mutate = useMutation({
    mutationFn: authQuery.postSign(url),
    onSuccess: (data) => {
      toast.success(data.message);
      push("/");
    },
    onError: (error: GraphQLError) => {
      toast.error(error?.message ?? "server error");
    },
  });

  return mutate;
};
