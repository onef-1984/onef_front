import { useInfiniteQuery } from "@tanstack/react-query";
import { BookQueryFn } from "@/apis/reactQuery/Query/BookQuery";

export const useInfiniteBookListAdaptor = (searchKeyword: string) => {
  const bookQueryFn = new BookQueryFn();
  const { data, error, fetchNextPage, isLoading } = useInfiniteQuery(bookQueryFn.getBookList(searchKeyword));

  return {
    isLoading,
    error,
    pages: data?.pages ?? [],
    fetchNextPage,
  };
};
