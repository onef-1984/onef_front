import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import ReportButton from "@/components/report/ReportButton";
import ReportFooter from "@/components/report/ReportFooter";
import ReportHeader from "@/components/report/ReportHeader";
import ReportMain from "@/components/report/ReportMain";
import toast from "react-hot-toast";
import ReportOwner from "@/components/report/ReportOwner";
import { useEffect } from "react";
import Comment from "@/components/comment/Comment";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import { GetServerSidePropsContext } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ReportRequest } from "@/apis/request/ReportRequest";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const id = params?.id;

  const queryClient = new QueryClient();
  const reportRequest = new ReportRequest();

  await queryClient.prefetchQuery(reportRequest.getReport(id as string));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
}

export default function Review() {
  const { report, user, book, error } = useReportAdaptor();
  const { push, id } = useRouterAdv();

  useEffect(() => {
    if (error) {
      toast.error("리뷰를 찾을 수 없습니다.");
      push("/404");
    }
  }, [error]);

  const content = {
    title: report.title,
    subTitle: `by ${user.nickname}`,
    line1: book.title,
    line2: book.author,
    line3: `${book.publisher} ∙ ${book.itemPage}p`,
  };

  useEffect(() => {
    window.scrollTo({ top: 1, behavior: "smooth" });
  }, [book.title]);

  return (
    <>
      <HeadMetaTag title={report.title} description={report.content.slice(0, 30)} image={book.cover} />

      <GlassyBackground image={book.cover}>
        <ReportHeader content={content} button={<ReportButton />} />
      </GlassyBackground>

      <div
        style={{
          maxWidth: "720px",
          width: "100%",
          margin: "0rem auto",
          padding: "0rem 1.6rem 16rem",
          fontWeight: "500",
          display: "flex",
          gap: "2.4rem",
          flexDirection: "column",
        }}
      >
        <ReportMain />
        <ReportFooter />

        <ReportOwner userNickname={user.nickname} userId={user.id} reportId={report.id} />

        <Comment id={id} depth={0} />
      </div>
    </>
  );
}
