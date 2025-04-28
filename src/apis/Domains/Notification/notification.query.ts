import { Query } from "@/apis/Base/Query";
import { Notification } from "@/types/notification.types";

export class NotificationQuery extends Query {
  constructor() {
    super();
  }

  queryKey = ["notification"];

  getNotifications(userId: string) {
    return this.queryOptions({
      queryKey: [...this.queryKey, userId],
      queryFn: this.queryFn<Array<Notification>>(`/notification`),
    });
  }
}
