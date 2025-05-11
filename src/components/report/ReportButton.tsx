import styles from "./Report.module.css";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { HiOutlineShare } from "@react-icons/all-files/hi/HiOutlineShare";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Link from "next/link";
import toast from "react-hot-toast";
import { Show } from "utilinent";
import { useIsQualified } from "@/hooks/useIsQualified";
import { useReportQuery } from "@/apis/useDomain/useReport.query";
import { useReportMutation } from "@/apis/useDomain/useReport.mutation";

export default function ReportButton() {
  const { mutate: deleteReportMutate } = useReportMutation().DeleteReport();
  const { id: reportId } = useRouterAdv();
  const {
    data: { report },
  } = useReportQuery().GetReport(reportId);

  const isMyReport = useIsQualified("myReport");

  return (
    <div className={styles.icons}>
      <Show when={isMyReport}>
        <Link href={report.id ? `/report/${report.id}/edit` : "/report"}>
          <SlNote />
        </Link>

        <button type="button" onClick={() => deleteReportMutate()}>
          <BsTrash3 />
        </button>
      </Show>

      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(`https://onef.co.kr/report/${reportId}`);
          toast.success("클립보드에 링크가 복사되었습니다.");
        }}
      >
        <HiOutlineShare />
      </button>
    </div>
  );
}
