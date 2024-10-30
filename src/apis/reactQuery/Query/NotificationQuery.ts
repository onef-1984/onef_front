import { QueryFn } from "./QueryFn";
import { Notification } from "@/types/notification.types";

export class NotificationQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["notification"];

  getNotifications(userId: string) {
    return {
      queryKey: [...this.queryKey, userId],
      queryFn: this.queryFn<Array<Notification>>(`/notification`),
    };
  }
}
