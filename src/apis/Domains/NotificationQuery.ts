import { Notification } from "@/types/notification.types";
import { Query } from "../Base/Query";

export class NotificationQuery extends Query {
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
