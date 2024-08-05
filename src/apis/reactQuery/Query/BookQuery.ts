import { QueryFn } from "./QueryFn";
import { GetBookList, Item } from "@/types/book.types";

export class BookQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["book"];

  getBookList(keyword: string) {
    return {
      queryKey: [...this.queryKey, keyword],
      queryFn: this.infiniteQueryFn<GetBookList>(`/aladin/search?keyword=${keyword}&take=10`),
      initialPageParam: 1,
      getNextPageParam: (lastPage: GetBookList, allPages: any, lastPageParam: number) =>
        lastPage.hasNext ? lastPageParam + 1 : undefined,
    };
  }

  getBook(isbn13: string) {
    return {
      queryKey: [...this.queryKey, isbn13],
      queryFn: this.queryFn<Item>(`/aladin/detail?isbn=${isbn13}`),
      enabled: !!isbn13,
    };
  }
}
