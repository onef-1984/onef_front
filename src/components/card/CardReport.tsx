import styles from "./CardReport.module.css";
import GlassyBackground from "../glassyBackground/GlassyBackground";
import { IoHeartSharp } from "react-icons/io5";
import Link from "next/link";
import { formatBookTitle } from "@/utils/formatBookTitle";

type CardReportProps = {
  cover: string;
  title: string;
  bookTitle: string;
  id: string;
  content: string;
  user: string;
  likeCount: number;
};

export default function CardReport({ cover, title, bookTitle, id, user, likeCount }: CardReportProps) {
  return (
    <Link className={styles.root} type="button" href={`/report/${id}`}>
      <GlassyBackground className={styles.root} image={cover}>
        <div className={styles.describe}>
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.bookTitle}>{formatBookTitle(bookTitle)}</p>
          </div>

          <div className={styles.userLike}>
            <p>by. {user}</p>
            <div className={styles.like}>
              {likeCount} <IoHeartSharp />
            </div>
          </div>
        </div>
      </GlassyBackground>
    </Link>
  );
}
