import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { FocusEvent, useEffect, useState } from "react";
import styles from "./Input.module.css";
import { ICommand } from "@uiw/react-md-editor";

import { useMDEditorCommands } from "@/hooks/useMDEditorCommands";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type EditorProps = {
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  name: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};

export default function Editor({ onChange, name, ...editor }: EditorProps) {
  const { imageCommand, command, extraCommand } = useMDEditorCommands();

  if (command.length === 0 || extraCommand.length === 0) return null;

  return (
    <MDEditor
      className={styles.markdown}
      {...editor}
      onChange={(value) => {
        value = value ?? "";
        onChange({ target: { name, value } });
      }}
      commands={[
        command[1],
        command[2],
        command[3],
        command[4],
        command[5],
        command[6],
        command[7],
        command[8],
        command[9],
        command[10],
        imageCommand,
        command[12],
        command[13],
        command[14],
        command[15],
      ]}
      extraCommands={[extraCommand[0], extraCommand[1], extraCommand[2]]}
      height={600}
    />
  );
}
