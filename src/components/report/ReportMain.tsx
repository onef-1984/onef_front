import styles from "./Report.module.css";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import clsx from "clsx";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useReportQuery } from "@/apis/useDomain/useReport.query";

const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

export default function ReportMain() {
  const { id: reportId } = useRouterAdv();
  const { data: { report } = { report: { content: "" } } } = new useReportQuery().getReport(reportId);

  return (
    <div data-color-mode="light">
      <MDPreview className={clsx(styles.reportMain, styles.reportSize)} source={report.content} />
    </div>
  );
}
