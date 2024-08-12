import Carousel from "../carousel/Carousel";
import styles from "./HomeCarousel.module.css";
import { useMostLikedReport } from "@/hooks/useAdaptor/reportLike/useMostLikedReport";
import { useRecentReport } from "@/hooks/useAdaptor/report/useRecentReport";

export default function HomeCarousel() {
  const { items: mostLikedReports } = useMostLikedReport();
  const { items: recentReports } = useRecentReport();

  return (
    <section className={styles.root}>
      <Carousel title="인기 리뷰" items={mostLikedReports} />
      <Carousel title="최신 리뷰" items={recentReports} />
    </section>
  );
}
