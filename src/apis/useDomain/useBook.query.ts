import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BookQuery } from "../Domains/Book/Book.query";
import { withAdaptor } from "../Decorator/withQuery";
import { BookQueryAdaptor } from "../Adaptor/Book.adaptor";

export class useBookQuery {
  private bookQuery = new BookQuery();

  getBookList = (keyword: string) => useInfiniteQuery(this.bookQuery.getBookList(keyword));

  @withAdaptor(BookQueryAdaptor.getBook)
  getBook = (isbn13: string) => useQuery(this.bookQuery.getBook(isbn13));

  // getBookAllData = (isbn13: string) => useQuery(this.bookQuery.getBookAllData(isbn13)); // deprecated
}
