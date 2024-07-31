import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportFooter from "@/components/report/ReportFooter";
import ReportHeader from "@/components/report/ReportHeader";
import ReportMain from "@/components/report/ReportMain";
import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { useRouter } from "next/router";

export default function Review() {
  const { error } = useReportAdaptor();
  const router = useRouter();

  if (error) {
    alert("존재하지 않는 게시글입니다");
    router.push("/");
  }

  return (
    <LayoutWrapper>
      <ReportHeader />
      <ReportMain />
      <ReportFooter />
    </LayoutWrapper>
  );
}
