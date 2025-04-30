import { CheckUserLikedReportQuery, GetReportQuery } from "@/types/graphql.types";
import { formatAuthor } from "@/utils/formatAuthor";
import { formatDate } from "@/utils/formatDate";

export class ReportQueryAdaptor {
  static getReport = (data: GetReportQuery) => ({
    report: {
      id: data.report.id,
      title: data.report.title,
      content: data.report.content,
      tags: data.report.tags ?? [],
      likeCount: data.report._count.userLiked ?? 0,
      date: formatDate(data.report.updatedAt),
    },
    user: {
      id: data.report.user.id,
      nickname: data.report.user.nickname,
    },
    book: {
      isbn13: data.report.book.isbn13,
      title: data.report.book.title,
      // 가나다 (지은이) 라마바 (옮긴이) 이런 형태로 옮
      author: formatAuthor(data.report.book.author),
      description: data.report.book.description,
      cover: data.report.book.cover,
      categoryId: data.report.book.categoryId ?? 0,
      categoryName: data.report.book.categoryName,
      pubDate: data.report.book.pubDate,
      publisher: data.report.book.publisher,
      priceStandard: data.report.book.priceStandard ?? 0,
      customerReviewRank: data.report.book.customerReviewRank ?? 0,
      itemPage: data.report.book.subInfo.itemPage ?? 0,
    },
  });

  static checkUserLikedReport = (data: CheckUserLikedReportQuery) => ({
    isLiked: data.isLiked.isLiked ?? false,
  });
}
