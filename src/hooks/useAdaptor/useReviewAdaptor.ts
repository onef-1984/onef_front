import { ReportQuery } from "@/apis/queryCapsule";
import { useQuery } from "@tanstack/react-query";
import { useRouteId } from "../useRouteId";

export const useReviewAdaptor = () => {
  const reviewId = useRouteId();

  const reportQuery = new ReportQuery(reviewId as string);
  const { data } = useQuery(reportQuery.getReport());

  return {
    statusCode: data?.statusCode ?? 200,
    report: {
      id: data?.id ?? "",
      title: data?.title ?? "",
      content: data?.content ?? "",
      reportType: data?.reportType ?? "",
      tags: data?.tags ?? [],
      createdAt: data?.createdAt ?? "",
      updatedAt: data?.updatedAt ?? "",
    },
    user: {
      id: data?.user?.id ?? "",
      email: data?.user?.email ?? "",
      nickname: data?.user?.nickname ?? "",
    },
    book: {
      title: data?.book?.title ?? "",
      author: data?.book?.author ?? "",
      description: data?.book?.description ?? "",
      isbn: data?.book?.isbn ?? "",
      cover: data?.book?.cover ?? "",
      page: data?.book?.page ?? 0,
      pubDate: data?.book?.pubDate ?? "",
      publisher: data?.book?.publisher ?? "",
      category: data?.book?.category ?? "",
      priceStandard: data?.book?.priceStandard ?? 0,
    },
  };
};
