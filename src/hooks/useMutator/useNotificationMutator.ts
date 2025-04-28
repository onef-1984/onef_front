import { NotificationMutation } from "@/apis/Domains/Notification/notification.mutation";
import { useMutation } from "@tanstack/react-query";

export const useNotificationMutator = () => {
  const notificationMutation = new NotificationMutation();

  const { mutate: deleteMutate } = useMutation(notificationMutation.deleteNotification());
  const { mutate: patchMutate } = useMutation(notificationMutation.patchNotification());

  return { deleteMutate, patchMutate };
};
