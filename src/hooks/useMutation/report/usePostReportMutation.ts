import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { BookQuery } from "@/apis/reactQuery/Query/BookQuery";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { FormState } from "@/hooks/useSicilian/report";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePostReportMutation = () => {
  // isbn13 값을 가져옴
  const { id: isbn13, push } = useRouterAdv();
  const { title, content } = FormState();
  const [tagList, setTagList] = useReportTagList();

  const bookQuery = new BookQuery();
  const { data } = useQuery(bookQuery.getBookAllData(isbn13));

  const reportMutation = new ReportMutation();

  const { mutate } = useMutation({
    mutationFn: reportMutation.createReport({
      BookInput: { ...data?.book! },
      ReportInput: { title, content, tags: tagList, isbn13 },
    }),
    onSuccess: (data) => {
      toast.success("리뷰가 작성되었습니다.");
      push(`/report/${data.report.id}`);
      setTagList([]);
    },
  });

  return {
    data,
    mutate,
  };
};
