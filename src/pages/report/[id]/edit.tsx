import GlassyBackground from "@/components/glassyBackground/GlassyBackground";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import ReportHeader from "@/components/report/ReportHeader";
import ReportForm from "@/components/reportForm/ReportForm";
import { headerContent } from "@/constants/reportEdit/headerContent";
import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { ReportMutateProvider } from "@/hooks/useContext/useReportMutationContext";
import { usePutReportMutation } from "@/hooks/useMutation/report/usePutReportMutation";
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

export default function Edit() {
  const { mutate } = usePutReportMutation();
  const [_, setTagList] = useReportTagList();

  const {
    report: { title, tags, content },
    book,
    isPending,
  } = useReportAdaptor();

  useEffect(() => {
    setValues({
      title: title,
      content: content,
    });
    setTagList(tags);
  }, [isPending]);

  return (
    <>
      <HeadMetaTag title="리뷰 수정" />

      <GlassyBackground image={book.cover}>
        <ReportHeader content={headerContent(book)} />
      </GlassyBackground>

      <ReportMutateProvider value={mutate}>
        <ReportForm />
      </ReportMutateProvider>
    </>
  );
}
