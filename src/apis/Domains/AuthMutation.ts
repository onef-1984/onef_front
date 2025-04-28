import { Message } from "@/types/graphql.types";
import { Mutation } from "@/apis/Base/Mutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

type SignInData = { email: string; password: string };
type SignUpData = SignInData & { nickname: string };

export class AuthMutation extends Mutation {
  constructor() {
    super();
  }

  private router = useRouterAdv();
  private queryClient = useQueryClient();

  postSign = (url: string) =>
    this.mutationOptions({
      mutationFn: (data: SignInData | SignUpData) => this.mutationFn<Message>(url, "post", data),
      onSuccess: (data) => {
        toast.success(data.message);
        this.router.push("/");
      },
      onError: (error: AxiosError<Message>) => {
        toast.error(error.response?.data.message ?? "server error");
      },
    });

  postSocialSign = () =>
    this.mutationOptions({
      mutationFn: ({ url }: { url: string; setErrorMessage: Dispatch<SetStateAction<string>> }) =>
        this.doFetch<Response>({
          url: url,
          method: "post",
        }),
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: ["user"], refetchType: "all" });

        this.router.push("/");
      },
      onError: (error, { setErrorMessage }) => {
        if (error instanceof AxiosError) {
          const { message } = error.response?.data;

          if (message === "Internal server error") {
            this.router.push("/");
          } else {
            setErrorMessage(message);
          }
        }
      },
    });

  deleteSignOut = () =>
    this.mutationOptions({
      mutationFn: () => this.mutationFn<Message>("/auth/signout", "delete"),
      onSuccess: () => {
        this.queryClient.resetQueries({ queryKey: ["user"] });
        this.router.push(this.router.asPath);
      },
    });
}
