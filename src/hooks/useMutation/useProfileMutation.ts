import { AuthMutation } from "@/apis/reactQuery/Mutation/AuthMutation";
import { ImageMutation } from "@/apis/reactQuery/Mutation/ImageMutation";
import { QueryClient, useMutation } from "@tanstack/react-query";

export const useProfileMutation = () => {
  const queryClient = new QueryClient();
  const imageMutation = new ImageMutation();
  const authMutation = new AuthMutation();

  const { mutate } = useMutation({
    mutationFn: async ({ formData, nickname }: { formData: FormData; nickname: string }) => {
      const { imageUrl } = await imageMutation.postImages("multi-upload")(formData);

      await authMutation.patchProfile()({ profileImage: imageUrl[0], nickname });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutate };
};
