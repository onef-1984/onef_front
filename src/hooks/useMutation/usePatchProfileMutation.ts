import { ImageMutation } from "@/apis/reactQuery/Mutation/ImageMutation";
import { UserRequest } from "@/apis/request/UserRequest";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ClientError } from "graphql-request";
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
    onError: (error: ClientError) => {
      toast.error(error.response.errors?.[0].message || "프로필 변경에 실패했습니다.");
    },
  });

  return { mutate };
};
