import CardReport from "../card/CardReport";
import DashboardHeader from "../dashboard/DashboardHeader";
import SearchBinder from "../searchPage/SearchBinder";
import { ReportQuery } from "@/apis/reactQuery/Query/ReportQuery";
import { useQuery } from "@tanstack/react-query";
import styles from "./ReportOwner.module.css";
import { formatReportArray } from "@/utils/formatReportArray";

export default function ReportOwner({
  userNickname,
  userId,
  reportId,
}: {
  userNickname: string;
  userId: string;
  reportId: string;
}) {
  const reportQuery = new ReportQuery();
  const { data } = useQuery(reportQuery.getUserLatestReportList(userId));

  const items = formatReportArray(data, reportId);

  return (
    <div className={styles.root}>
      <DashboardHeader userNickname={userNickname} />

      <div>
        <p className={styles.recentReview}>최근 리뷰</p>
        <br />
        <SearchBinder>
          {items.map((item) => {
            if (!item) return;
            return <CardReport key={item.id} {...item} />;
          })}
        </SearchBinder>
      </div>
    </div>
  );
}
