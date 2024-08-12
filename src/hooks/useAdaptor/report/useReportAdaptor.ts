import { useQuery } from "@tanstack/react-query";
import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";
import { formatDate } from "@/utils/formatDate";
import { formatAuthor } from "@/utils/formatAuthor";
import { useRouterAdv } from "../../useRouterAdv";

export const useReportAdaptor = () => {
  const { id: reviewId } = useRouterAdv();

  const reportQuery = new ReportQuery();
  const { data, error, isPending } = useQuery(reportQuery.getReport(reviewId));

  return {
    error,
    isPending,
    report: {
      id: data?.id ?? "",
      title: data?.title ?? "",
      content: data?.content ?? "",
      tags: data?.tags ?? [],
      likeCount: data?._count.userLiked ?? 0,
      date: formatDate(data?.updatedAt),
    },
    user: {
      id: data?.user.id ?? "",
      nickname: data?.user.nickname ?? "",
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
      itemPage: data?.book.subInfo.itemPage ?? 0,
    },
  };
};
