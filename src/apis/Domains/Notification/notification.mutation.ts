import { Mutation } from "@/apis/Base/Mutation";
import { useQueryClient } from "@tanstack/react-query";

export class NotificationMutation extends Mutation {
  constructor() {
    super();
  }

  queryClient = useQueryClient();

  patchNotification = () =>
    this.mutationOptions({
      mutationFn: ({ id }: { id: string }) => {
        return this.doFetch({ url: `/notification/${id}`, method: "DELETE" });
      },
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: ["notification"], refetchType: "all" });
      },
    });

  deleteNotification = () =>
    this.mutationOptions({
      mutationFn: ({ id }: { id: string }) => {
        return this.doFetch({ url: `/notification/${id}`, method: "PATCH", data: { isRead: true } });
      },
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: ["notification"], refetchType: "all" });
      },
    });
}
