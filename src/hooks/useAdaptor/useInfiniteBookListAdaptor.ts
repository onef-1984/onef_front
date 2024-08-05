import { BookQuery } from "@/apis/reactQuery/Query/BookQuery";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteBookListAdaptor = (searchKeyword: string) => {
  const bookQuery = new BookQuery();
  const { data, fetchNextPage } = useInfiniteQuery(bookQuery.getBookList(searchKeyword));

  return { fetchNextPage, pages: data?.pages ?? [] };
};
