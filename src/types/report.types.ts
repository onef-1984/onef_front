import { Item, SubInfo } from "./book.types";
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

export type GetReport = Roll<Omit<Required<CreateReport>, "isbn13"> & { id: string; book: Item } & TimeStamp>;
export type GetReportList = { report: Array<GetReport> };
