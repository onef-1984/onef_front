import { User } from "./auth.types";

export type ReportComment = {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  reportId?: string;
  parentId?: string;
  replies: Array<ReportComment>;
  user: Pick<User, "id" | "email" | "nickname" | "profileImage">;
};

export type ReportCommentList = { comments: Array<ReportComment> };
