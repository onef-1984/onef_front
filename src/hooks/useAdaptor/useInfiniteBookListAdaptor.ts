import { BookQuery } from "@/apis/Domains/Book/Book.query";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteBookListAdaptor = (searchKeyword: string) => {
  const bookQuery = new BookQuery();
  const { data, fetchNextPage } = useInfiniteQuery(bookQuery.getBookList(searchKeyword));

  const pages = data?.pages.map((page) => page.bookList.items).flatMap((items) => items) ?? [];

  return {
    fetchNextPage,
    pages,
  };
};
