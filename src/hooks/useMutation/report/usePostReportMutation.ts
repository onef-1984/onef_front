import { BookMutation } from "@/apis/reactQuery/Mutation/BookMutation";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useBookAdaptor } from "@/hooks/useAdaptor/useBookAdaptor";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { initValue, setValue } from "@/hooks/useSicilian/report";
import { CreateReport } from "@/types/report.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const usePostReportMutation = () => {
  const { push } = useRouter();

  const bookMutation = new BookMutation();
  const reportMutation = new ReportMutation();

  const { data } = useBookAdaptor();

  const [tagList, setTagList] = useReportTagList();

  const { mutate } = useMutation({
    mutationFn: async (report: Omit<CreateReport, "isbn13">) => {
      const { isbn13 } = await bookMutation.postBook()(data);
      const { id } = await reportMutation.postReport()({ ...report, isbn13 });

      return id;
    },
    onSuccess: (data: any, variable: any) => {
      alert("리뷰가 작성되었습니다.");
      console.log(data, variable);
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
