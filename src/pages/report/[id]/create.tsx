import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import ReportHeader from "@/components/report/ReportHeader";
import { headerContent } from "@/constants/reportEdit/headerContent";
import { ReportMutateProvider } from "@/hooks/useContext/useReportMutationContext";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { GetServerSidePropsContext } from "next";
import ReportForm from "@/components/reportForm/ReportForm";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import { useBookQuery } from "@/apis/useDomain/useBook.query";
import { useReportMutation } from "@/apis/useDomain/useReport.mutation";

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

export default function Create() {
  const { mutate: createReportMutate } = new useReportMutation().createReport();
  const { id: isbn13 } = useRouterAdv();
  const {
    data = {
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
    },
  } = new useBookQuery().getBook(isbn13);

  return (
    <>
      <HeadMetaTag title="리뷰 작성" />

      <GlassyBackground image={data.cover}>
        <ReportHeader content={headerContent(data)} />
      </GlassyBackground>

      <ReportMutateProvider value={createReportMutate}>
        <ReportForm />
      </ReportMutateProvider>
    </>
  );
}
