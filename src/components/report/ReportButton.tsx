import styles from "./Report.module.css";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { HiOutlineShare } from "@react-icons/all-files/hi/HiOutlineShare";
import { useReportMutator } from "@/hooks/useMutation/useReportMutator";
import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Link from "next/link";
import toast from "react-hot-toast";
import { Show } from "utilinent";
import { useIsQualified } from "@/hooks/useIsQualified";

export default function ReportButton() {
  const { DeleteReportMutate } = useReportMutator();
  const { report } = useReportAdaptor();
  const { id: reportId } = useRouterAdv();

  const isMyReport = useIsQualified("myReport");

  return (
    <div className={styles.icons}>
      <Show when={isMyReport}>
        <Link href={report.id ? `/report/${report.id}/edit` : "/report"}>
          <SlNote />
        </Link>

        <button type="button" onClick={() => DeleteReportMutate()}>
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
