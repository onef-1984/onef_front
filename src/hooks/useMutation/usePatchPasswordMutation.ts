import { UserRequest } from "@/apis/request/UserRequest";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
};
