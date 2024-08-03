import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";
import { ImageMutation } from "@/apis/reactQuery/Mutation/ImageMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProfileImageMutation = () => {
  const queryClient = useQueryClient();
  const imageMutation = new ImageMutation();
  const authMutation = new AuthMutation();

  const { data, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { imageUrl } = await imageMutation.postImages("multi-upload")(formData);

      await authMutation.patchProfile()({ profileImage: imageUrl[0] });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { data, mutate };
};
