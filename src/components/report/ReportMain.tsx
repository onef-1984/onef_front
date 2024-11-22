import { useReportAdaptor } from "../../hooks/useAdaptor/report/useReportAdaptor";
import styles from "./Report.module.css";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import clsx from "clsx";

const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

export default function ReportMain() {
  const { report } = useReportAdaptor();

  return (
    <div data-color-mode="light">
      <MDPreview className={clsx(styles.reportMain, styles.reportSize)} source={report.content} />
    </div>
  );
}
