import { BookQuery } from "@/apis/reactQuery/Query/BookQuery";
import { formatAuthor } from "@/utils/formatAuthor";
import { useQuery } from "@tanstack/react-query";

export const useBookAdaptor = ({ isbn13 }: { isbn13: string }) => {
  // isbn13에 해당하는 책 정보를 가져옴
  const bookQuery = new BookQuery();
  const { data } = useQuery(bookQuery.getBook(isbn13));

  return {
    data,
    book: {
      isbn13: data?.isbn13 ?? "",
      title: data?.title ?? "",
      // 가나다 (지은이) 라마바 (옮긴이) 이런 형태로 옮
      author: formatAuthor(data?.author),
      description: data?.description ?? "",
      cover: data?.cover ?? "",
      categoryId: data?.categoryId ?? 0,
      categoryName: data?.categoryName ?? "",
      pubDate: data?.pubDate ?? "",
      publisher: data?.publisher ?? "",
      priceStandard: data?.priceStandard ?? 0,
      customerReviewRank: data?.customerReviewRank ?? 0,
      itemPage: data?.subInfo.itemPage ?? 0,
    },
  };
};
