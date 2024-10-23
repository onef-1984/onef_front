import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import styles from "./Report.module.css";
import Tag from "../tag/Tag";
import clsx from "clsx";
import { useIsMyReview } from "@/hooks/useIsMyReview";
import { useIsLogin } from "@/hooks/useIsLogin";
import { useIsLikedReport } from "@/hooks/useAdaptor/reportLike/useIsLikedReport";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoHeart } from "@react-icons/all-files/io5/IoHeart";
import { useReportLikesMutation } from "@/hooks/useMutation/report/userReportLikesMutation";
import Map from "../util/Map";
import Clickable from "../clickable/Clickable";

export default function ReportFooter() {
  const { report } = useReportAdaptor();
  const isMyReport = useIsMyReview();
  const isLogin = useIsLogin();
  const { isLiked } = useIsLikedReport();
  const { mutate, isPending } = useReportLikesMutation();

  return (
    <section className={clsx(styles.reportFooter)}>
      <div>
        <div className={styles.tags}>
          <Map each={report.tags}>
            {(item, index) => {
              return <Tag key={index}>{item}</Tag>;
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
          mutate(isLiked ? "delete" : "post");
        }}
        className={styles.likeButton}
      >
        {report.likeCount} {isMyReport || isLiked ? <IoHeart /> : <IoHeartOutline />}
      </Clickable>
    </section>
  );
}
