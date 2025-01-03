import CardReport from "../card/CardReport";
import DashboardHeader from "../dashboard/DashboardHeader";
import SearchBinder from "../searchPage/SearchBinder";
import styles from "./ReportOwner.module.css";
import { Map } from "utilinent";
import { useQuery } from "@tanstack/react-query";
import { formatReportArray } from "@/utils/formatReportArray";
import { ReportRequest } from "@/apis/request/ReportRequest";

export default function ReportOwner({
  userNickname,
  userId,
  reportId,
}: {
  userNickname: string;
  userId: string;
  reportId: string;
}) {
  const reportRequest = new ReportRequest();
  const { data } = useQuery(reportRequest.getUserLatestReportList(userId));
  const items = formatReportArray(data, reportId);

  return (
    <div className={styles.root}>
      <DashboardHeader userNickname={userNickname} />

      <div>
        <p className={styles.recentReview}>최근 리뷰</p>
        <br />
        <SearchBinder>
          <Map each={items}>
            {(item) => {
              if (!item) return;
              else return <CardReport key={item.id} {...item} />;
            }}
          </Map>
        </SearchBinder>
      </div>
    </div>
  );
}
