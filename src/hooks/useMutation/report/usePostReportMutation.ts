import { BookMutation } from "@/apis/reactQuery/Mutation/BookMutation";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useBookAdaptor } from "@/hooks/useAdaptor/useBookAdaptor";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { initValue, setForm } from "@/hooks/useSicilian/report";
import { CreateReport } from "@/types/report.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePostReportMutation = () => {
  const bookMutation = new BookMutation();
  const reportMutation = new ReportMutation();
  const queryClient = useQueryClient();

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
      toast.success("리뷰가 작성되었습니다.");
      push(`/report/${data}`);
      setForm(initValue);
      setTagList([]);
      queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { data, mutate };
};
