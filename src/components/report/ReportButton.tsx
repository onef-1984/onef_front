import { useIsMyReview } from "@/hooks/useIsMyReview";
import styles from "./Report.module.css";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { HiOutlineShare } from "@react-icons/all-files/hi/HiOutlineShare";
import { useDeleteReportMutation } from "@/hooks/useMutation/report/useDeleteReportMutation";
import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Link from "next/link";
import toast from "react-hot-toast";
import Show from "../util/Show";

export default function ReportButton() {
  const { mutate } = useDeleteReportMutation();
  const { report } = useReportAdaptor();
  const { id: reportId } = useRouterAdv();

  const isMyReview = useIsMyReview();

  return (
    <div className={styles.icons}>
      <Show when={isMyReview}>
        <Link href={report.id ? `/report/${report.id}/edit` : "/report"}>
          <SlNote />
        </Link>

        <button type="button" onClick={() => mutate()}>
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
