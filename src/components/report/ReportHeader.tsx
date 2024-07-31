import styles from "./ReportHeader.module.css";
import ReportButton from "./ReportButton";

export default function ReportHeader({
  content,
  button,
}: {
  button?: React.ReactNode;
  content: {
    title: string;
    subTitle: string;
    line1: string;
    line2: string;
    line3: string;
  };
}) {
  return (
    <div className={styles.root}>
      <div className={styles.reportInfo}>
        <div>
          <h2 className={styles.reportTitle}>{content.title}</h2>
          <p>{content.subTitle}</p>
        </div>

        <hr />

        <div>
          <p>{content.line1}</p>
          <p>{content.line2}</p>
          <p>{content.line3}</p>
        </div>
      </div>

      {button}
    </div>
  );
}
