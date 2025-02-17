import { useReportAdaptor } from "@/hooks/useAdaptor/report/useReportAdaptor";
import { useIsLikedReport } from "@/hooks/useAdaptor/reportLike/useIsLikedReport";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoHeart } from "@react-icons/all-files/io5/IoHeart";
import { Map } from "utilinent";
import styles from "./Report.module.css";
import Clickable from "../clickable/Clickable";
import Link from "next/link";
import Tag from "../tag/Tag";
import { useIsQualified } from "@/hooks/useIsQualified";
import { useReportMutator } from "@/hooks/useMutation/useReportMutator";

export default function ReportFooter() {
  const { report } = useReportAdaptor();
  const isMyReport = useIsQualified("myReport");
  const isLogin = useIsQualified("login");
  const { isLiked } = useIsLikedReport();
  const { ToggleReportLikeMutate, isToggleReportLikePending } = useReportMutator();

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
        disabled={isToggleReportLikePending || (isLogin ? isMyReport : true)}
        onClick={() => {
          ToggleReportLikeMutate();
        }}
        className={styles.likeButton}
      >
        {report.likeCount} {isMyReport || isLiked ? <IoHeart /> : <IoHeartOutline />}
      </Clickable>
    </section>
  );
}
