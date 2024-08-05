import { BookMutation } from "@/apis/reactQuery/Mutation/BookMutation";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useBookAdaptor } from "@/hooks/useAdaptor/useBookAdaptor";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { initValue, setValue } from "@/hooks/useSicilian/report";
import { CreateReport } from "@/types/report.types";
import { useMutation } from "@tanstack/react-query";

export const usePostReportMutation = () => {
  const bookMutation = new BookMutation();
  const reportMutation = new ReportMutation();

  // isbn13 값을 가져옴
  const { id: isbn13, push } = useRouterAdv();
  const { data } = useBookAdaptor({ isbn13 });

  const [tagList, setTagList] = useReportTagList();

  const { mutate } = useMutation({
    mutationFn: async (report: Omit<CreateReport, "isbn13">) => {
      const { isbn13 } = await bookMutation.postBook()(data);
      const { id } = await reportMutation.postReport()({ ...report, isbn13 });

      return id;
    },
    onSuccess: (data: any, variable: any) => {
      alert("리뷰가 작성되었습니다.");
      push(`/report/${data}`);
      setValue(initValue);
      setTagList([]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { data, mutate };
};
