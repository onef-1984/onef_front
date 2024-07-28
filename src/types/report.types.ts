import { User } from "./auth.types";
import { Item, Packing, SubInfo } from "./book.types";
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

type ReportBookItem = Omit<Item, "subInfo"> & { subInfo: Omit<SubInfo, "packing"> & Packing };

export type GetReport = Roll<
  Omit<Required<CreateReport>, "isbn13"> & {
    id: string;
    book: ReportBookItem;
    user: User;
  } & TimeStamp
>;
export type GetReportList = { report: Array<GetReport> };
