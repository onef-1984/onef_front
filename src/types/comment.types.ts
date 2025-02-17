import { User } from "./graphql.types";

export type ReportComment = {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reportId?: string | null;
  parentId?: string | null;
  replies?: Array<ReportComment>;
  user: Pick<User, "id" | "email" | "nickname" | "profileImage">;
};

export type ReportCommentList = { comments: Array<ReportComment> };
