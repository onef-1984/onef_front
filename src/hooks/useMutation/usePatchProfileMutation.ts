import { ImageMutation } from "@/apis/reactQuery/Mutation/ImageMutation";
import { UserRequest } from "@/apis/request/UserRequest";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePatchProfileMutation = () => {
  const queryClient = useQueryClient();
  const imageMutation = new ImageMutation();
  const userRequest = new UserRequest();

  const { mutate } = useMutation({
    mutationFn: async ({ formData, nickname, bio }: { formData: FormData; nickname: string; bio: string }) => {
      const { imageUrl } = await imageMutation.postImages("multi-upload")(formData);

      await userRequest.changeProfile()({ profileImage: imageUrl[0], nickname, bio });
    },
    onSuccess: () => {
      toast.success("프로필이 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["user"], refetchType: "all" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
};
