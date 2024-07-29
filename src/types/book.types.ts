import { Roll } from "./util.types";

export type GetBookList = Roll<{
  hasNext: boolean;
  items: Array<Omit<Item, "subInfo" | "priceStandard">>;
}>;

export type SubInfo = {
  subTitle: string;
  originalTitle: string;
  itemPage: number;
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
