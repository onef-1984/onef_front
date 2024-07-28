import { useReviewAdaptor } from "@/hooks/useAdaptor/useReviewAdaptor";
import styles from "./Report.module.css";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { HiOutlineShare } from "react-icons/hi2";
import clsx from "clsx";

export default function ReportHeader() {
  const { report, user, book, subInfo } = useReviewAdaptor();

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
              {book.publisher} ∙ {subInfo.itemPage}p ∙ {book.priceStandard}원
            </p>
          </div>
        </div>

        <div className={styles.icons}>
          <button type="button">
            <SlNote />
          </button>
          <button type="button">
            <BsTrash3 />
          </button>
          <button type="button">
            <HiOutlineShare />
          </button>
        </div>
      </div>
    </section>
  );
}
