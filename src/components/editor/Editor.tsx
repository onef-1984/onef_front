import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Dispatch, SetStateAction } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type EditorProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function Editor({ value, setValue }: EditorProps) {
  return (
    <MDEditor
      value={value}
      onChange={(value) => {
        setValue(value!);
      }}
    />
  );
}
