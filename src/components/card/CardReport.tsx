import styles from "./CardReport.module.css";
import GlassyBackground from "../glassyBackground/GlassyBackground";
import { IoHeart } from "@react-icons/all-files/io5/IoHeart";
import Link from "next/link";
import { formatBookTitle } from "@/utils/formatBookTitle";
import { GetReport } from "@/types/report.types";

export default function CardReport(item: GetReport) {
  return (
    <Link className={styles.root} type="button" href={`/report/${item.id}`}>
      <GlassyBackground className={styles.root} image={item.book.cover}>
        <div className={styles.describe}>
          <div>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.bookTitle}>{formatBookTitle(item.book.title)}</p>
          </div>

          <div className={styles.userLike}>
            <p>by. {item.user.nickname}</p>
            <div className={styles.like}>
              {item._count.userLiked} <IoHeart />
            </div>
          </div>
        </div>
      </GlassyBackground>
    </Link>
  );
}
