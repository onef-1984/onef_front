import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportHeader from "@/components/report/ReportHeader";
import EditForm from "@/components/reportEdit/EditForm";
import { headerContent } from "@/constants/reportEdit/headerContent";
import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { usePutReportMutation } from "@/hooks/useMutation/report/usePutReportMutation";
import { setValue } from "@/hooks/useSicilian/report";
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
  // TODO : 레포트 수정 작업에 필요한 로직을 컴포넌트 외부로 분리해야 합니다
  const { mutate } = usePutReportMutation();
  const [tagList, setTagList] = useReportTagList();

  const {
    report: { title, content, tags },
    book,
    isPending,
  } = useReportAdaptor();

  useEffect(() => {
    setValue({
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
