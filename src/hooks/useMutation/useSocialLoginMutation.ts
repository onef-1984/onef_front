import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { useRouterAdv } from "../useRouterAdv";
import { Fetcher } from "@/apis/Base/Fetcher";

export default function useSocialLoginMutation() {
  const { push } = useRouterAdv();
  const queryClient = useQueryClient();

  const fetcher = new Fetcher();

  const { mutate } = useMutation({
    mutationFn: ({ url }: { url: string; setErrorMessage: Dispatch<SetStateAction<string>> }) =>
      fetcher.doFetch<Response>({
        url: url,
        method: "post",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"], refetchType: "all" });

      push("/");
    },
    onError: (error, { setErrorMessage }) => {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;

        if (message === "Internal server error") {
          push("/");
        } else {
          setErrorMessage(message);
        }
      }
    },
  });

  return { mutate };
}
