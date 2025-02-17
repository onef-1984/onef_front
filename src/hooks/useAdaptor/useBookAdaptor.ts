import { BookQuery } from "@/apis/Domains/Book/Book.query";
import { formatAuthor } from "@/utils/formatAuthor";
import { useQuery } from "@tanstack/react-query";

export const useBookAdaptor = ({ isbn13 }: { isbn13: string }) => {
  const bookQuery = new BookQuery();
  const { data } = useQuery(bookQuery.getBook(isbn13));

  return {
    data,
    book: {
      isbn13: data?.book.isbn13 ?? "",
      title: data?.book.title ?? "",
      // 가나다 (지은이) 라마바 (옮긴이) 이런 형태로 옮
      author: formatAuthor(data?.book.author),
      description: data?.book.description ?? "",
      cover: data?.book.cover ?? "",
      categoryId: data?.book.categoryId ?? 0,
      categoryName: data?.book.categoryName ?? "",
      pubDate: data?.book.pubDate ?? "",
      publisher: data?.book.publisher ?? "",
      priceStandard: data?.book.priceStandard ?? 0,
      customerReviewRank: data?.book.customerReviewRank ?? 0,
      itemPage: data?.book.subInfo.itemPage ?? 0,
    },
  };
};
