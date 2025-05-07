/* eslint-disable react-hooks/rules-of-hooks */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BookQuery } from "../Domains/Book/Book.query";
import { transformResult } from "../Decorator/transformResult";
import { BookQueryAdaptor } from "../Adaptor/Book.adaptor";
import { thisBind } from "../Decorator/thisBind";

@thisBind
export class useBookQuery {
  private bookQuery = new BookQuery();

  getBookList(keyword: string) {
    return useInfiniteQuery(this.bookQuery.getBookList(keyword));
  }

  @transformResult(BookQueryAdaptor.getBook)
  getBook(isbn13: string) {
    return useQuery(this.bookQuery.getBook(isbn13));
  }

  // getBookAllData = (isbn13: string) => useQuery(this.bookQuery.getBookAllData(isbn13)); // deprecated
}
