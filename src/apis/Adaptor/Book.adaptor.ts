import { GetBookQuery } from "@/types/graphql.types";
import { formatAuthor } from "@/utils/formatAuthor";

export class BookQueryAdaptor {
  static getBook = (data: GetBookQuery) => ({
    isbn13: data.book.isbn13,
    title: data.book.title,
    // 가나다 (지은이) 라마바 (옮긴이) 이런 형태로 옮
    author: formatAuthor(data.book.author),
    description: data.book.description,
    cover: data.book.cover,
    categoryId: data.book.categoryId,
    categoryName: data.book.categoryName,
    pubDate: data.book.pubDate,
    publisher: data.book.publisher,
    priceStandard: data.book.priceStandard,
    customerReviewRank: data.book.customerReviewRank,
    itemPage: data.book.subInfo.itemPage,
  });
}
