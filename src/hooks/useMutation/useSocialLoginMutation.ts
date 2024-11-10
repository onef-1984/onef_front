import fetcher from "@/apis/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { useRouterAdv } from "../useRouterAdv";

export default function useSocialLoginMutation() {
  const { push } = useRouterAdv();

  const { mutate } = useMutation({
    mutationFn: ({ url }: { url: string; setErrorMessage: Dispatch<SetStateAction<string>> }) =>
      fetcher<Response>({
        url: url,
        method: "post",
      }),
    onSuccess: () => {
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
