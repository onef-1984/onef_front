import { BookQuery } from "@/apis/reactQuery/Query/BookQuery";
import { useRouteId } from "../useRouteId";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookMutation } from "@/apis/reactQuery/Mutation/BookMutation";
import { Item } from "@/types/book.types";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { CreateReport } from "@/types/report.types";
import { useRouter } from "next/router";
import { FormEvent } from "react";

export const useReportMutation = () => {
  const { push, back } = useRouter();

  // isbn13 값을 가져옴
  const isbn = useRouteId() as string;
  const reportId = isbn;

  // isbn13에 해당하는 책 정보를 가져옴
  const bookQuery = new BookQuery();
  const { data } = useQuery(bookQuery.getBook(isbn));

  // 책 정보를 받아서 저장 + 리뷰 내용 저장하는 mutation
  const bookMutation = new BookMutation();
  const reportMutation = new ReportMutation();
  const { mutate: postReportMutate } = useMutation({
    mutationFn: async (report: Omit<CreateReport, "isbn13">) => {
      const { isbn13 } = await bookMutation.postBook()(data);
      const { id } = await reportMutation.postReport()({ ...report, isbn13 });

      return id;
    },
    onSuccess: (data: any) => {
      push(`/report/${data}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: deleteReportMutate } = useMutation({
    mutationFn: () => reportMutation.deleteReport()(reportId),
    onSuccess: () => {
      alert("리뷰가 삭제되었습니다.");
      push("/");
    },
  });

  return { data, postReportMutate, deleteReportMutate, back };
};
