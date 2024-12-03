import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";
import { useMutation } from "@tanstack/react-query";
import { useRouterAdv } from "../useRouterAdv";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Message } from "@/types/graphql.types";

export const useSignMutation = (url: string) => {
  const { push } = useRouterAdv();
  const authQuery = new AuthMutation();

  const mutate = useMutation({
    mutationFn: authQuery.postSign(url),
    onSuccess: (data) => {
      toast.success(data.message);
      push("/");
    },
    onError: (error: AxiosError<Message>) => {
      toast.error(error.response?.data.message ?? "server error");
    },
  });

  return mutate;
};
