import { Report, User } from "./graphql.types";

export type Notification = {
  id: string;
  type: "NEW_COMMENT_ON_REPORT" | "NEW_LIKE_ON_REPORT" | "NEW_REPORT_FROM_FOLLOWING";
  sender: User;
  receiver: User;
  report: Report;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
};
