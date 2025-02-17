import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import ReportHeader from "@/components/report/ReportHeader";
import { headerContent } from "@/constants/reportEdit/headerContent";
import { useBookAdaptor } from "@/hooks/useAdaptor/useBookAdaptor";
import { ReportMutateProvider } from "@/hooks/useContext/useReportMutationContext";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { GetServerSidePropsContext } from "next";
import ReportForm from "@/components/reportForm/ReportForm";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import { useReportMutator } from "@/hooks/useMutation/useReportMutator";

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
  const { CreateReportMutate } = useReportMutator();
  const { id: isbn13 } = useRouterAdv();
  const { book } = useBookAdaptor({ isbn13 });

  return (
    <>
      <HeadMetaTag title="리뷰 작성" />

      <GlassyBackground image={book.cover}>
        <ReportHeader content={headerContent(book)} />
      </GlassyBackground>

      <ReportMutateProvider value={CreateReportMutate}>
        <ReportForm />
      </ReportMutateProvider>
    </>
  );
}
