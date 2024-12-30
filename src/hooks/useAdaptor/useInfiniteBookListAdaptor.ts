import { useInfiniteQuery } from "@tanstack/react-query";
import { BookRequest } from "@/apis/request/BookRequest";

export const useInfiniteBookListAdaptor = (searchKeyword: string) => {
  const bookRequest = new BookRequest();
  const { data, fetchNextPage } = useInfiniteQuery(bookRequest.getBookList(searchKeyword));

  const pages = data?.pages.map((page) => page.bookList.items).flatMap((items) => items) ?? [];

  return {
    fetchNextPage,
    pages,
  };
};
