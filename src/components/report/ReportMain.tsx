import { useReviewAdaptor } from "@/hooks/useAdaptor/useReviewAdaptor";
import clsx from "clsx";
import styles from "./Report.module.css";
import MDEditor from "@uiw/react-markdown-editor";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default function ReportMain() {
  const { report } = useReviewAdaptor();

  return (
    <section>
      <MDEditor.Markdown className={clsx(styles.reportSize, styles.reportMain)} source={report.content} />
    </section>
  );
}
