import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";
import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportButton from "@/components/report/ReportButton";
import ReportFooter from "@/components/report/ReportFooter";
import ReportHeader from "@/components/report/ReportHeader";
import ReportMain from "@/components/report/ReportMain";
import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ query: { id } }: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const reportQuery = new ReportQuery();

  let res;

  try {
    res = await queryClient.fetchQuery(reportQuery.getReport(id as string));
  } catch {}

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

export default function Review() {
  const { report, user, book } = useReportAdaptor();

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
