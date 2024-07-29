import { useQuery } from "@tanstack/react-query";
import { useRouteId } from "../useRouteId";
import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";
import { formatDate } from "@/utils/formatDate";
import { formatAuthor } from "@/utils/formatAuthor";

export const useReviewAdaptor = () => {
  const reviewId = useRouteId();

  const reportQuery = new ReportQuery(reviewId as string);
  const { data, error } = useQuery(reportQuery.getReport());

  return {
    error,
    report: {
      id: data?.id ?? "",
      title: data?.title ?? "",
      content: data?.content ?? "",
      tags: data?.tags ?? [],
      date: formatDate(data?.updatedAt),
    },
    user: {
      id: data?.user.id ?? "",
      email: data?.user.email ?? "",
      nickname: data?.user.nickname ?? "",
      profileImage: data?.user.profileImage ?? "",
    },
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
    },
    subInfo: {
      itemPage: data?.book.subInfo.itemPage ?? 0,
      weight: data?.book.subInfo.weight ?? 0,
      sizeDepth: data?.book.subInfo.sizeDepth ?? 0,
      sizeHeight: data?.book.subInfo.sizeHeight ?? 0,
      sizeWidth: data?.book.subInfo.sizeWidth ?? 0,
    },
  };
};
