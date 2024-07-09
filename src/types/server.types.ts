export type TimeStamp = {
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  nickname: string;
};

export type Book = {
  isbn: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  page: number;
  pubDate: string;
  publisher: string;
  category: string;
  priceStandard: number;
};

export type Report = {
  id: string;
  title: string;
  content: string;
  reportType: ReportType;
  tags: Array<string>;
  user: User;
  book: Book;
};

type ReportType = "MIDDLE" | "SHORT" | "LONG";
