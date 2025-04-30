import { useMutation } from "@tanstack/react-query";
import { NotificationMutation } from "../Domains/Notification/notification.mutation";

export class useNotificationMutation {
  private notificationMutation = new NotificationMutation();

  deleteNotification = () => useMutation(this.notificationMutation.deleteNotification());
  patchNotification = () => useMutation(this.notificationMutation.patchNotification());
}
