import { ReportQuery } from "@/apis/Domains/Report/Report.query";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import HeroSec from "@/components/heroSec/HeroSec";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  const reportQuery = new ReportQuery();

  await queryClient.prefetchQuery(reportQuery.getMostLikedReportList());
  await queryClient.prefetchQuery(reportQuery.getRecentReportList());

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default function Home() {
  return (
    <>
      <HeadMetaTag title="메인 페이지" />

      <HeroSec />
    </>
  );
}
