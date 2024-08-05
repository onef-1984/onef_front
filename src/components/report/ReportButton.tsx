import { useIsMyReview } from "@/hooks/useIsMyReview";
import styles from "./Report.module.css";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { HiOutlineShare } from "react-icons/hi2";
import { useDeleteReportMutation } from "@/hooks/useMutation/report/useDeleteReportMutation";
import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import Link from "next/link";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { IoHeartOutline } from "react-icons/io5";

export default function ReportButton() {
  const { mutate } = useDeleteReportMutation();
  const { report } = useReportAdaptor();
  const { id: reportId } = useRouterAdv();

  const isMyReview = useIsMyReview();

  return (
    <div className={styles.icons}>
      {isMyReview ? (
        <>
          <Link href="/report/[id]/edit" as={`/report/${report.id}/edit`}>
            <SlNote />
          </Link>

          <button type="button" onClick={() => mutate()}>
            <BsTrash3 />
          </button>
        </>
      ) : (
        <button type="button">
          <IoHeartOutline />
        </button>
      )}

      <button type="button" onClick={() => navigator.clipboard.writeText(`https://onef.co.kr/report/${reportId}`)}>
        <HiOutlineShare />
      </button>
    </div>
  );
}
