import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import ReportFooter from "@/components/report/ReportFooter";
import ReportHeader from "@/components/report/ReportHeader";
import ReportMain from "@/components/report/ReportMain";
import { useReviewAdaptor } from "@/hooks/useAdaptor/useReviewAdaptor";
import { useRouter } from "next/router";

export default function Review() {
  const { report, error } = useReviewAdaptor();
  const router = useRouter();

  console.log(report.content);

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
