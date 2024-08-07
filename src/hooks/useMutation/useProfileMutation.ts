import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";
import { ImageMutation } from "@/apis/reactQuery/Mutation/ImageMutation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useProfileMutation = () => {
  const queryClient = useQueryClient();
  const imageMutation = new ImageMutation();
  const authMutation = new AuthMutation();

  const { mutate } = useMutation({
    mutationFn: async ({ formData, nickname, bio }: { formData: FormData; nickname: string; bio: string }) => {
      const { imageUrl } = await imageMutation.postImages("multi-upload")(formData);

      await authMutation.patchProfile()({ profileImage: imageUrl[0], nickname, bio });
    },
    onSuccess: () => {
      toast.success("프로필이 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
};
