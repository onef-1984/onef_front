import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BookQuery } from "../Domains/Book/Book.query";
import { BookQueryAdaptor } from "../Adaptor/Book.adaptor";

export const useBookQuery = () => {
  const GetBook = (isbn13: string) => {
    const res = useQuery(new BookQuery().getBook(isbn13));
    return { ...res, data: BookQueryAdaptor.getBook(res.data) };
  };

  const GetBookList = (keyword: string) => {
    const { data, ...res } = useInfiniteQuery(new BookQuery().getBookList(keyword));
    return { ...res, data: BookQueryAdaptor.getBookList(data) };
  };

  return {
    GetBook,
    GetBookList,
  };
};
