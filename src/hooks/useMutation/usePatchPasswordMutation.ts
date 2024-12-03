import { UserRequest } from "@/apis/request/UserRequest";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ClientError } from "graphql-request";
import toast from "react-hot-toast";

export const usePatchPasswordMutation = () => {
  const queryClient = useQueryClient();
  const userRequest = new UserRequest();

  const { mutate } = useMutation({
    mutationFn: userRequest.changePassword(),
    onSuccess: () => {
      toast.success("비밀번호가 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: ClientError) => {
      toast.error(error.response.errors?.[0].message || "비밀번호 변경에 실패했습니다.");
    },
  });

  return { mutate };
};
