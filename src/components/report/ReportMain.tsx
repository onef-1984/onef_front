import { useReportAdaptor } from "../../hooks/useAdaptor/useReportAdaptor";
import styles from "./Report.module.css";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import clsx from "clsx";

const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

export default function ReportMain() {
  const { report } = useReportAdaptor();

  return <MDPreview className={clsx(styles.reportMain, styles.reportSize)} source={report.content}></MDPreview>;
}
