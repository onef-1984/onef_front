import { useReportMutation } from "@/apis/useDomain/useReport.mutation";
import { useReportQuery } from "@/apis/useDomain/useReport.query";
import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import ReportHeader from "@/components/report/ReportHeader";
import ReportForm from "@/components/reportForm/ReportForm";
import { headerContent } from "@/constants/reportEdit/headerContent";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { ReportMutateProvider } from "@/hooks/useContext/useReportMutationContext";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { setValues } from "@/hooks/useSicilian/report";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const accessToken = context.req.cookies.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const bookMock = {
  isbn13: "",
  title: "",
  author: "",
  description: "",
  cover: "",
  categoryId: 0,
  categoryName: "",
  pubDate: "",
  publisher: "",
  priceStandard: 0,
  customerReviewRank: 0,
  itemPage: 0,
};

export default function Edit() {
  const { mutate: updateReportMutate } = new useReportMutation().updateReport();
  const [_, setTagList] = useReportTagList();
  const { id: reviewId } = useRouterAdv();

  const {
    data: { book, report: { title, content, tags } } = {
      report: { title: "", content: "", tags: [] },
      book: bookMock,
    },
  } = new useReportQuery().getReport(reviewId);

  useEffect(() => {
    setValues({
      title,
      content,
    });
    setTagList(tags);
  }, []);

  return (
    <>
      <HeadMetaTag title="리뷰 수정" />

      <GlassyBackground image={book.cover}>
        <ReportHeader content={headerContent({ ...book })} />
      </GlassyBackground>

      <ReportMutateProvider value={updateReportMutate}>
        <ReportForm />
      </ReportMutateProvider>
    </>
  );
}
