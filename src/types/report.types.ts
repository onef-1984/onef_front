import { User } from "./auth.types";
import { Item } from "./book.types";
import { Roll } from "./util.types";

export type TimeStamp = {
  createdAt: string;
  updatedAt: string;
};

export type CreateReport = {
  isbn13: string;
  title: string;
  content: string;
  tags?: Array<string>;
};

export type GetReport = Roll<
  Omit<Required<CreateReport>, "isbn13"> & {
    id: string;
    book: Item;
    user: Pick<User, "nickname" | "id">;
    favoriteCount: number;
  } & TimeStamp
>;
export type GetReportList = { report: Array<GetReport> };
