import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportHeader from "@/components/report/ReportHeader";
import EditForm from "@/components/reportEdit/EditForm";
import { useBookAdaptor } from "@/hooks/useAdaptor/useBookAdaptor";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { usePostReportMutation } from "@/hooks/useMutation/report/usePostReportMutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";

export default function Create() {
  const { mutate } = usePostReportMutation();
  const { id: isbn13 } = useRouterAdv();
  const { book } = useBookAdaptor({ isbn13 });

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
