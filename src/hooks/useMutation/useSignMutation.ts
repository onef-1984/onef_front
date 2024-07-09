import fetcher from "@/apis/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useSignMutation = (url: string) => {
  const router = useRouter();

  const mutate = useMutation({
    mutationFn: async (data: { email: string; password: string; nickName?: string }) => {
      const res = await fetcher({
        url,
        method: "POST",
        data,
      });

      return res;
    },
    onSuccess: (data, variables) => {
      console.log(data, "data");
      console.log(variables, "variables");

      if (data.statusCode === 200) {
        alert(data.message);
        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    },
  });

  return mutate;
};
