import { BookQueryFn } from "@/apis/reactQuery/Query/BookQuery";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useCreateReportMutation, useGetAllBookDataQuery } from "@/hooks/useGraphql";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { FormState } from "@/hooks/useSicilian/report";
import { gql } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

const CREATE_REPORT_MUTATION = gql`
  mutation CreateReport($BookInput: BookInput!, $ReportInput: ReportInput!) {
    book: createBook(bookInput: $BookInput) {
      isbn13
    }
    report: createReport(reportInput: $ReportInput) {
      id
    }
  }
`;

export const usePostReportMutation = () => {
  // isbn13 값을 가져옴
  const { id: isbn13, push } = useRouterAdv();
  const { title, content } = FormState();
  const [tagList, setTagList] = useReportTagList();

  const bookQuery = new BookQueryFn();
  const { data } = useQuery(bookQuery.getBookAllData(isbn13));

  const [mutate] = useCreateReportMutation({
    variables: {
      BookInput: data?.data?.book!,
      ReportInput: { title, content, tags: tagList, isbn13 },
    },
    onCompleted: (data) => {
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
