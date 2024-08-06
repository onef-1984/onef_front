import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouterAdv } from "../useRouterAdv";
import toast from "react-hot-toast";

export const useSignMutation = (url: string) => {
  const { push } = useRouterAdv();
  const authQuery = new AuthMutation();

  const mutate = useMutation({
    mutationFn: authQuery.postSign(url),
    onSuccess: (data) => {
      toast.success(data.message);
      push("/");
    },
    onError: (error: AxiosError<{ statusCode: number; message: string }>) => {
      toast.error(error.response?.data.message ?? "server error");
    },
  });

  return mutate;
};
