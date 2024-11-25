import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import { useIsMyReview } from "@/hooks/useIsMyReview";
import { useIsLogin } from "@/hooks/useIsLogin";
import { useIsLikedReport } from "@/hooks/useAdaptor/reportLike/useIsLikedReport";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoHeart } from "@react-icons/all-files/io5/IoHeart";
import { useReportLikesMutation } from "@/hooks/useMutation/report/userReportLikesMutation";
import styles from "./Report.module.css";
import Clickable from "../clickable/Clickable";
import Map from "../util/Map";
import Link from "next/link";
import Tag from "../tag/Tag";

export default function ReportFooter() {
  const { report } = useReportAdaptor();
  const isMyReport = useIsMyReview();
  const isLogin = useIsLogin();
  const { isLiked } = useIsLikedReport();
  const { mutate, isPending } = useReportLikesMutation();

  return (
    <section className={styles.reportFooter}>
      <div>
        <div className={styles.tags}>
          <Map each={report.tags}>
            {(item, index) => {
              return (
                <Link key={index} href={{ pathname: "/search", query: { searchType: "tag", keyword: item } }}>
                  <Tag>{item}</Tag>
                </Link>
              );
            }}
          </Map>
        </div>

        <br />

        <p>{report.date}</p>
      </div>

      <Clickable
        color="like"
        size="small"
        type="button"
        disabled={isPending || (isLogin ? isMyReport : true)}
        onClick={() => {
          mutate();
        }}
        className={styles.likeButton}
      >
        {report.likeCount} {isMyReport || isLiked ? <IoHeart /> : <IoHeartOutline />}
      </Clickable>
    </section>
  );
}
