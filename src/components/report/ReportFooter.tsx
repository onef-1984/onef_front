import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import styles from "./Report.module.css";
import Tag from "../tag/Tag";
import Button from "../clickable/Button";
import clsx from "clsx";
import { useIsMyReview } from "@/hooks/useIsMyReview";
import { useIsLogin } from "@/hooks/useIsLogin";
import { useIsLikedReport } from "@/hooks/useAdaptor/reportLike/useIsLikedReport";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoHeart } from "@react-icons/all-files/io5/IoHeart";
import { useReportLikesMutation } from "@/hooks/useMutation/report/userReportLikesMutation";
import { Map } from "../util/Map";

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

      <Button
        disabled={isPending || (isLogin ? isMyReport : true)}
        onClick={() => {
          mutate(isLiked ? "delete" : "post");
        }}
        className={styles.likeButton}
        type="button"
        color="like"
        size="small"
      >
        {report.likeCount} {isMyReport || isLiked ? <IoHeart /> : <IoHeartOutline />}
      </Button>
    </section>
  );
}
