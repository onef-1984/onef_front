import { GetBookListQuery, GetBookQuery } from "@/types/graphql.types";
import { formatAuthor } from "@/utils/formatAuthor";
import { InfiniteData } from "@tanstack/react-query";

export class BookQueryAdaptor {
  static getBook = (data?: GetBookQuery) => ({
    isbn13: data?.book.isbn13 ?? "",
    title: data?.book.title ?? "",
    // 가나다 (지은이) 라마바 (옮긴이) 이런 형태로 옮
    author: formatAuthor(data?.book.author) ?? "",
    description: data?.book.description ?? "",
    cover: data?.book.cover ?? "",
    categoryId: data?.book.categoryId ?? 0,
    categoryName: data?.book.categoryName ?? "",
    pubDate: data?.book.pubDate ?? "",
    publisher: data?.book.publisher ?? "",
    priceStandard: data?.book.priceStandard ?? 0,
    customerReviewRank: data?.book.customerReviewRank ?? 0,
    itemPage: data?.book.subInfo.itemPage ?? 0,
  });

  static getBookList = (data?: InfiniteData<GetBookListQuery>) => {
    return (
      data ?? {
        pages: [{ bookList: { items: [], hasNext: false } }],
      }
    );
  };
}
