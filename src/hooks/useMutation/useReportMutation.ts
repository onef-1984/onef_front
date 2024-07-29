import { BookQuery } from "@/apis/reactQuery/Query/BookQuery";
import { useRouteId } from "../useRouteId";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookMutation } from "@/apis/reactQuery/Mutation/BookMutation";
import { Item } from "@/types/book.types";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { CreateReport } from "@/types/report.types";
import { useRouter } from "next/router";

export const useReportMutation = () => {
  const router = useRouter();

  // isbn13 값을 가져옴
  const isbn = useRouteId() as string;

  // isbn13에 해당하는 책 정보를 가져옴
  const bookQuery = new BookQuery();
  const { data } = useQuery(bookQuery.getBook(isbn));

  // 책 정보를 받아서 저장 + 리뷰 내용 저장하는 mutation
  const bookMutation = new BookMutation();
  const reportMutation = new ReportMutation();
  const { mutate } = useMutation({
    mutationFn: async ({ data, report }: { data: Item | undefined; report: Omit<CreateReport, "isbn13"> }) => {
      const { isbn13 } = await bookMutation.postBook()(data);
      const { id } = await reportMutation.postReport()({ ...report, isbn13 });

      return id;
    },
    onSuccess: (data: any) => {
      router.push(`/report/${data}`);
    },
  });

  return { data, mutate };
};
