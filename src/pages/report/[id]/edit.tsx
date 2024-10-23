import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportHeader from "@/components/report/ReportHeader";
import EditForm from "@/components/reportEdit/EditForm";
import { headerContent } from "@/constants/reportEdit/headerContent";
import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { usePutReportMutation } from "@/hooks/useMutation/report/usePutReportMutation";
import { setForm } from "@/hooks/useSicilian/report";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
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

export default function Edit() {
  const { mutate } = usePutReportMutation();
  const [tagList, setTagList] = useReportTagList();

  const {
    report: { title, content, tags },
    book,
    isPending,
  } = useReportAdaptor();

  useEffect(() => {
    setForm({
      title,
      content,
    });
    setTagList(tags);
  }, [isPending]);

  return (
    <>
      <Head>
        <title>onef - 리뷰 수정</title>
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
