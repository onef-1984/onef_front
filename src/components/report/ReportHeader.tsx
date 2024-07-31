import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { useIsMyReview } from "@/hooks/useIsMyReview";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { HiOutlineShare } from "react-icons/hi2";
import styles from "./Report.module.css";
import clsx from "clsx";
import { useRouter } from "next/router";
import GlassyBackground from "../glassyBackground/GlassyBackground";
import { useDeleteReportMutation } from "@/hooks/useMutation/report/useDeleteReportMutation";

export default function ReportHeader() {
  const { report, user, book } = useReportAdaptor();
  const { push } = useRouter();
  const { mutate } = useDeleteReportMutation();

  return (
    <GlassyBackground image={book.cover}>
      <div className={clsx(styles.reportInfo, styles.reportSize)}>
        <div>
          <h2 className={styles.reportTitle}>{report.title}</h2>
          <p>by. {user.nickname}</p>
        </div>

        <hr />

        <div>
          <p>{book.title}</p>
          <p>{book.author}</p>
          <p>
            {book.publisher} ∙ {book.itemPage}p
          </p>
        </div>
      </div>

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

        <button type="button">
          <HiOutlineShare />
        </button>
      </div>
    </GlassyBackground>
  );
}
