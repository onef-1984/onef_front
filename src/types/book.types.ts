import { Roll } from "./util.types";

export type GetBookList = Roll<
  {
    query: string;
    item: Array<Omit<Item, "subInfo" | "priceStandard">>;
  } & Book
>;

export type Book = {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
};

export type SubInfo = {
  subTitle: string;
  originalTitle: string;
  itemPage: number;
  packing: Packing;
};

export type Packing = {
  weight: number;
  sizeDepth: number;
  sizeHeight: number;
  sizeWidth: number;
};

export type Item = {
  isbn13: string;
  title: string;
  author: string;
  pubDate: string;
  description: string;
  cover: string;
  categoryId: number;
  categoryName: string;
  publisher: string;
  customerReviewRank: number;
  priceStandard: number;
  subInfo: SubInfo;
};
