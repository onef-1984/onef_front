import { useReviewAdaptor } from "@/hooks/useAdaptor/useReviewAdaptor";
import styles from "./Report.module.css";

export default function ReportFooter() {
  const { report } = useReviewAdaptor();

  return (
    <section className={styles.reportSize}>
      <p>
        태그 :{" "}
        {report.tags.map((item, index) => {
          return <span key={index}>{item}</span>;
        })}
      </p>
      <p>작성일 : {report.updatedAt}</p>
    </section>
  );
}
