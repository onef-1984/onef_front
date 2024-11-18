import { useInfiniteQuery } from "@tanstack/react-query";
import { BookRequest } from "@/apis/request/BookRequest";

export const useInfiniteBookListAdaptor = (searchKeyword: string) => {
  const bookRequest = new BookRequest();
  const { data, error, fetchNextPage, isLoading } = useInfiniteQuery(bookRequest.getBookList(searchKeyword));

  return {
    isLoading,
    error,
    fetchNextPage,
    pages: data?.pages ?? [],
  };
};
