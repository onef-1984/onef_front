import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export const useSignMutation = (url: string) => {
  const router = useRouter();
  const authQuery = new AuthMutation();

  const mutate = useMutation({
    mutationFn: authQuery.postSign(url),
    onSuccess: (data) => {
      alert(data.message);
      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ statusCode: number; message: string }>) => {
      alert(error.response?.data.message ?? "server error");
    },
  });

  return mutate;
};
