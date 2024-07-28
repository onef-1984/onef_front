import { useReviewAdaptor } from "@/hooks/useAdaptor/useReviewAdaptor";
import styles from "./Report.module.css";
import Tag from "../tag/Tag";

export default function ReportFooter() {
  const { report } = useReviewAdaptor();

  return (
    <section className={styles.reportSize}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {report.tags.map((item, index) => {
          return <Tag key={index}>{item}</Tag>;
        })}
      </div>

      <p>{report.date}</p>
    </section>
  );
}
