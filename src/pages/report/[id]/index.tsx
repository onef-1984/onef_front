import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportButton from "@/components/report/ReportButton";
import ReportFooter from "@/components/report/ReportFooter";
import ReportHeader from "@/components/report/ReportHeader";
import ReportMain from "@/components/report/ReportMain";
import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useEffect } from "react";

export default function Review() {
  const { error, report, user, book } = useReportAdaptor();
  const { back, push, id } = useRouterAdv();

  if (error) {
    back();
    alert("존재하지 않는 게시글입니다");
  }

  const content = {
    title: report.title,
    subTitle: `by ${user.nickname}`,
    line1: book.title,
    line2: book.author,
    line3: `${book.publisher} ∙ ${book.itemPage}p`,
  };

  return (
    <LayoutWrapper>
      <GlassyBackground image={book.cover}>
        <ReportHeader content={content} button={<ReportButton />} />
      </GlassyBackground>
      <ReportMain />
      <ReportFooter />
    </LayoutWrapper>
  );
}
