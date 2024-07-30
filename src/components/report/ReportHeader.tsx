import { useReviewAdaptor } from "@/hooks/useAdaptor/useReviewAdaptor";
import { useIsMyReview } from "@/hooks/useIsMyReview";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { HiOutlineShare } from "react-icons/hi2";
import styles from "./Report.module.css";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useRouter } from "next/router";
import { useReportMutation } from "@/hooks/useMutation/useReportMutation";

export default function ReportHeader() {
  const { report, user, book, subInfo } = useReviewAdaptor();

  const { deleteReportMutate } = useReportMutation();

  return (
    <section
      className={styles.root}
      style={{
        backgroundImage: `url(${book.cover})`,
      }}
    >
      <div className={styles.blur}>
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
              {book.publisher} ∙ {subInfo.itemPage}p
            </p>
          </div>
        </div>

        <div className={styles.icons}>
          {useIsMyReview() ? (
            <>
              <button type="button">
                <SlNote />
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteReportMutate();
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
      </div>
    </section>
  );
}
