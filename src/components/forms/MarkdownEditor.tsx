import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { FocusEvent, useEffect, useState } from "react";
import styles from "./Input.module.css";
import { ICommand, TextAreaTextApi, TextState } from "@uiw/react-md-editor";
import fetcher from "@/apis/axios";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const commands = import("@uiw/react-md-editor").then((a) => {
  return a.commands;
});

const extraCommands = import("@uiw/react-md-editor").then((a) => {
  return a;
});

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetcher<{ imageUrl: string }>({ url: "/image/single-upload", method: "POST", data: formData });

  return response.imageUrl;
};

const imageCommand: ICommand = {
  name: "image",
  keyCommand: "image",
  buttonProps: { "aria-label": "Add image" },
  icon: (
    <svg width="12" height="12" viewBox="0 0 20 20">
      <path
        fill="currentColor"
        d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 18.5c-4.7 0-8.5-3.8-8.5-8.5S5.3 1.5 10 1.5 18.5 5.3 18.5 10 14.7 18.5 10 18.5zM14 7.5c-.8 0-1.5.7-1.5 1.5S13.2 10.5 14 10.5 15.5 9.8 15.5 9 14.8 7.5 14 7.5zM6 14.5l2.5-3 1.5 2 2-2.5 3.5 4H6z"
      />
    </svg>
  ),
  execute: async (state: TextState, api: TextAreaTextApi) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        const imageUrl = await uploadImage(file);
        console.log(imageUrl);
        api.replaceSelection(`![alt text](${imageUrl})`);
      }
    };
    input.click();
  },
};

type EditorProps = {
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  name: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};

export default function Editor({ onChange, name, ...editor }: EditorProps) {
  const [command, setCommand] = useState<Array<ICommand>>([]);
  const [extraCommand, setExtraCommand] = useState<Array<ICommand>>([]);

  useEffect(() => {
    commands.then((a) => {
      setCommand(a.getCommands());
    });
    extraCommands.then((a) => {
      setExtraCommand(a.getExtraCommands());
    });
  }, []);

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
