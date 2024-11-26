import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import ReportHeader from "@/components/report/ReportHeader";
import Head from "next/head";
import { headerContent } from "@/constants/reportEdit/headerContent";
import { useBookAdaptor } from "@/hooks/useAdaptor/useBookAdaptor";
import { ReportMutateProvider } from "@/hooks/useContext/useMutationContext";
import { usePostReportMutation } from "@/hooks/useMutation/report/usePostReportMutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { GetServerSidePropsContext } from "next";
import ReportForm from "@/components/reportForm/ReportForm";

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
  const { mutate } = usePostReportMutation();
  const { id: isbn13 } = useRouterAdv();
  const { book } = useBookAdaptor({ isbn13 });

  return (
    <>
      <Head>
        <title>onef - 리뷰 작성</title>
      </Head>

      <GlassyBackground image={book.cover}>
        <ReportHeader content={headerContent(book)} />
      </GlassyBackground>
      <ReportMutateProvider value={mutate}>
        <ReportForm />
      </ReportMutateProvider>
    </>
  );
}
