import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportButton from "@/components/report/ReportButton";
import ReportFooter from "@/components/report/ReportFooter";
import ReportHeader from "@/components/report/ReportHeader";
import ReportMain from "@/components/report/ReportMain";
import toast from "react-hot-toast";
import Head from "next/head";
import ReportOwner from "@/components/report/ReportOwner";
import { useEffect } from "react";
import { CommentMutationContext } from "@/hooks/useContext/useCommentMutationContext";
import { CommentMutation } from "@/apis/reactQuery/Mutation/CommentMutation";
import CommentInput from "@/components/comment/CommentInput";
import CommentContainer from "@/components/comment/CommentContainer";

export default function Review() {
  const commentMutation = new CommentMutation();
  const { report, user, book, error } = useReportAdaptor();
  const { push, id } = useRouterAdv();

  useEffect(() => {
    if (error) {
      toast.error("리뷰를 찾을 수 없습니다.");
      push("/404");
    }
  }, []);

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
      <Head>
        <title>onef - {report.title}</title>

        <meta name="description" content={report.content} />

        <meta property="og:url" content={`https://onef.co.kr/report/${report.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`onef - ${report.title}`} />
        <meta property="og:description" content={report.content} />
        <meta property="og:image" content={book.cover} />
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

          <ReportOwner userNickname={user.nickname} userId={user.id} reportId={report.id} />

          <CommentMutationContext.Provider
            value={{
              inputName: "댓글",
              buttonName: "저장",
              parentId: id,
              depth: 0,
              mutationFn: commentMutation.postComment,
            }}
          >
            <CommentInput />
          </CommentMutationContext.Provider>

          <CommentContainer id={id} />

          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
      </LayoutWrapper>
    </>
  );
}
