import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportHeader from "@/components/report/ReportHeader";
import EditForm from "@/components/reportEdit/EditForm";
import { headerContent } from "@/constants/reportEdit/headerContent";
import { useBookAdaptor } from "@/hooks/useAdaptor/useBookAdaptor";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { usePostReportMutation } from "@/hooks/useMutation/report/usePostReportMutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

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
      <LayoutWrapper>
        <GlassyBackground image={book.cover}>
          <ReportHeader content={headerContent(book)} />
        </GlassyBackground>

        <MutationContext.Provider
          value={(reqData) => {
            mutate(reqData);
          }}
        >
          <EditForm />
        </MutationContext.Provider>
      </LayoutWrapper>
    </>
  );
}
