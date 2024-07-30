import { QueryFn } from "./QueryFn";
import { BookEndPoint } from "@/apis/endpoints/book";
import { GetBookList, Item } from "@/types/book.types";

export class BookQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["book"];

  getBookList(keyword: string) {
    return {
      queryKey: [...this.queryKey, keyword],
      queryFn: this.infiniteQueryFn<GetBookList>(BookEndPoint.getBookList(keyword)),
      initialPageParam: 1,
      getNextPageParam: (lastPage: GetBookList, allPages: any, lastPageParam: number) =>
        lastPage.hasNext ? lastPageParam + 1 : undefined,
    };
  }

  getBook(isbn13: string) {
    return {
      queryKey: [...this.queryKey, isbn13],
      queryFn: this.queryFn<Item>(BookEndPoint.getBook(isbn13)),
      enabled: !!isbn13,
    };
  }
}
