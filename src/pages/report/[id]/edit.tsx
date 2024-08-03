import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportHeader from "@/components/report/ReportHeader";
import EditForm from "@/components/reportEdit/EditForm";
import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { usePutReportMutation } from "@/hooks/useMutation/report/usePutReportMutation";
import { setValue } from "@/hooks/useSicilian/report";
import { useEffect } from "react";

export default function Edit() {
  // TODO : 레포트 수정 작업에 필요한 로직을 컴포넌트 외부로 분리해야 합니다
  const { mutate } = usePutReportMutation();
  const [tagList, setTagList] = useReportTagList();

  const {
    report: { title, content, tags },
    book,
    isPending,
  } = useReportAdaptor();

  useEffect(() => {
    setValue({
      title,
      content,
    });
    setTagList(tags);
  }, [isPending]);

  const headerContent = {
    title: book.title,
    subTitle: `저자 : ${book.author}`,
    line1: `출판사 : ${book.publisher}`,
    line2: `카테고리 : ${book.categoryName}`,
    line3: `출간일 : ${book.pubDate}`,
  };

  return (
    <LayoutWrapper>
      <GlassyBackground image={book.cover}>
        <ReportHeader content={headerContent} />
      </GlassyBackground>
      <MutationContext.Provider
        value={(reqData) => {
          mutate(reqData);
        }}
      >
        <EditForm />
      </MutationContext.Provider>
    </LayoutWrapper>
  );
}
