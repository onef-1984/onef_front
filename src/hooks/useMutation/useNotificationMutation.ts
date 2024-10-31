import fetcher from "@/apis/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useNotificationMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return fetcher({ url: `/notification/${id}`, method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"], refetchType: "all" });
    },
  });

  const { mutate: patchMutate } = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return fetcher({ url: `/notification/${id}`, method: "PATCH", data: { isRead: true } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"], refetchType: "all" });
    },
  });

  return { deleteMutate, patchMutate };
};
