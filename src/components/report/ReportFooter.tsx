import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoHeart } from "@react-icons/all-files/io5/IoHeart";
import { Map } from "utilinent";
import styles from "./Report.module.css";
import Clickable from "../clickable/Clickable";
import Link from "next/link";
import Tag from "../tag/Tag";
import { useIsQualified } from "@/hooks/useIsQualified";
import { useReportQuery } from "@/apis/useDomain/useReport.query";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useReportMutation } from "@/apis/useDomain/useReport.mutation";

export default function ReportFooter() {
  const { id: reportId } = useRouterAdv();
  const isMyReport = useIsQualified("myReport");
  const isLogin = useIsQualified("login");
  const { data: { report } = { report: { tags: [""], date: "", likeCount: 0 } } } = new useReportQuery().getReport(
    reportId,
  );
  const { data } = new useReportQuery().checkUserLikedReport(reportId);
  const { mutate: toggleReportLikeMutate, isPending: isToggleReportLikePending } =
    new useReportMutation().toggleReportLike();

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
          toggleReportLikeMutate();
        }}
        className={styles.likeButton}
      >
        {report.likeCount} {isMyReport || data?.isLiked ? <IoHeart /> : <IoHeartOutline />}
      </Clickable>
    </section>
  );
}
