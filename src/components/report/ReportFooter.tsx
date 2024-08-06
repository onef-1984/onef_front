import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import styles from "./Report.module.css";
import Tag from "../tag/Tag";
import Button from "../clickable/Button";
import clsx from "clsx";
import { useIsMyReview } from "@/hooks/useIsMyReview";
import { useIsLogin } from "@/hooks/useIsLogin";
import { useIsLikedReport } from "@/hooks/useAdaptor/useIsLikedReport";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { useReportLikesMutation } from "@/hooks/useMutation/report/userReportLikesMutation";

export default function ReportFooter() {
  const { report } = useReportAdaptor();
  const isMyReport = useIsMyReview();
  const isLogin = useIsLogin();
  const { isLiked } = useIsLikedReport();
  const { mutate, isPending } = useReportLikesMutation();

  console.log(isPending || (isLogin ? isMyReport : true));

  return (
    <section className={clsx(styles.reportSize, styles.reportFooter)}>
      <div>
        <div className={styles.tags}>
          {report.tags.map((item, index) => {
            return <Tag key={index}>{item}</Tag>;
          })}
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
