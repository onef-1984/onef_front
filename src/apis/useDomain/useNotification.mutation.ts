import { useMutation } from "@tanstack/react-query";
import { NotificationMutation } from "../Domains/Notification/notification.mutation";

export const useNotificationMutation = () => {
  const DeleteNotification = () => {
    return useMutation(new NotificationMutation().deleteNotification());
  };
  const PatchNotification = () => {
    return useMutation(new NotificationMutation().patchNotification());
  };

  return { DeleteNotification, PatchNotification };
};
