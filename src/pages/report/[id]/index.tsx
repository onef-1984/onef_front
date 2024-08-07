import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportButton from "@/components/report/ReportButton";
import ReportFooter from "@/components/report/ReportFooter";
import ReportHeader from "@/components/report/ReportHeader";
import ReportMain from "@/components/report/ReportMain";
import toast from "react-hot-toast";
import Head from "next/head";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ReportOwner from "@/components/report/ReportOwner";

export default function Review() {
  const { report, user, book, error } = useReportAdaptor();
  const { push } = useRouterAdv();

  if (error) {
    toast.error("리뷰를 찾을 수 없습니다.");
    push("/404");
  }

  const content = {
    title: report.title,
    subTitle: `by ${user.nickname}`,
    line1: book.title,
    line2: book.author,
    line3: `${book.publisher} ∙ ${book.itemPage}p`,
  };

  return (
    <>
      <Head>
        <title>onef - {report.title}</title>
      </Head>
      <LayoutWrapper>
        <GlassyBackground image={book.cover}>
          <ReportHeader content={content} button={<ReportButton />} />
        </GlassyBackground>

        <div
          style={{
            maxWidth: "720px",
            width: "100%",
            margin: "0rem auto",
            padding: "1.6rem",
            fontWeight: "500",
            display: "flex",
            gap: "2.4rem",
            flexDirection: "column",
          }}
        >
          <ReportMain />
          <ReportFooter />
        </div>

        <ReportOwner userNickname={user.nickname} userId={user.id} reportId={report.id} />
      </LayoutWrapper>
    </>
  );
}
