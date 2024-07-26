import { useQuery } from "@tanstack/react-query";
import { useRouteId } from "../useRouteId";
import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";

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
      createdAt: data?.createdAt ?? "",
      updatedAt: data?.updatedAt ?? "",
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
      author: data?.book.author ?? "",
      description: data?.book.description ?? "",
      cover: data?.book.cover ?? "",
      categoryId: data?.book.categoryId ?? 0,
      categoryName: data?.book.categoryName ?? "",
      publisher: data?.book.publisher ?? "",
      priceStandard: data?.book.priceStandard ?? 0,
      customerReviewRank: data?.book.customerReviewRank ?? 0,
    },
    subInfo: {
      subTitle: data?.book.subInfo.subTitle ?? "",
      originalTitle: data?.book.subInfo.originalTitle ?? "",
      itemPage: data?.book.subInfo.itemPage ?? 0,
      packing: {
        styleDesc: data?.book.subInfo.packing.styleDesc ?? "",
        weight: data?.book.subInfo.packing.weight ?? 0,
        sizeDepth: data?.book.subInfo.packing.sizeDepth ?? 0,
        sizeHeight: data?.book.subInfo.packing.sizeHeight ?? 0,
        sizeWidth: data?.book.subInfo.packing.sizeWidth ?? 0,
      },
    },
  };
};
