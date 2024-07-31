import { useIsMyReview } from "@/hooks/useIsMyReview";
import styles from "./Report.module.css";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { HiOutlineShare } from "react-icons/hi2";
import { useDeleteReportMutation } from "@/hooks/useMutation/report/useDeleteReportMutation";
import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRouteId } from "@/hooks/useRouteId";

export default function ReportButton() {
  const { mutate } = useDeleteReportMutation();
  const { push } = useRouter();
  const { report } = useReportAdaptor();

  const reportId = useRouteId() as string;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://onef.co.kr/report/${reportId}`);
  };

  return (
    <div className={styles.icons}>
      {useIsMyReview() ? (
        <>
          <button
            type="button"
            onClick={() => {
              push(`/report/${report.id}/edit`);
            }}
          >
            <SlNote />
          </button>
          <button
            type="button"
            onClick={() => {
              mutate();
            }}
          >
            <BsTrash3 />
          </button>
        </>
      ) : (
        ""
      )}

      <button type="button" onClick={handleCopy}>
        <HiOutlineShare />
      </button>
    </div>
  );
}
