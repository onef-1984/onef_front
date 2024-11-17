import { useInfiniteQuery } from "@tanstack/react-query";
import { BookQuery } from "@/apis/reactQuery/Query/BookQuery";

export const useInfiniteBookListAdaptor = (searchKeyword: string) => {
  const bookQuery = new BookQuery();
  const { data, error, fetchNextPage, isLoading } = useInfiniteQuery(bookQuery.getBookList(searchKeyword));

  return {
    isLoading,
    error,
    pages: data?.pages ?? [],
    fetchNextPage,
  };
};
