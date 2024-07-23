export type GetBookDetail = {
  item: Array<
    Item & {
      subInfo: SubInfo;
    }
  >;
} & Book;

export type GetBookList = {
  query: string;
  item: Array<Item>;
} & Book;

export type Book = {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
};

export type SubInfo = {
  subTitle: string;
  originalTitle: string;
  itemPage: number;
  packing: {
    styleDesc: string;
    weight: number;
    sizeDepth: number;
    sizeHeight: number;
    sizeWidth: number;
  };
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
  priceStandard: number;
  customerReviewRank: number;
  subInfo: SubInfo;
};
