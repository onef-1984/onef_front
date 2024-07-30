import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { FocusEvent } from "react";
import styles from "./Input.module.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type EditorProps = {
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  name: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};

export default function Editor({ onChange, name, ...editor }: EditorProps) {
  return (
    <MDEditor
      className={styles.markdown}
      {...editor}
      onChange={(value) => {
        value = value ?? "";
        onChange({ target: { name, value } });
      }}
      height={600}
    />
  );
}
