import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { LuPen } from "react-icons/lu";
import { ImageInputProps, useImageInput } from "@/hooks/useImageInput";
import { IoEyeOffOutline } from "@react-icons/all-files/io5/IoEyeOffOutline";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import { useToggle } from "@/hooks/useToggle";
import { useMDEditorCommands } from "@/hooks/useMDEditorCommands";
import { useTagInputHandler, UseTagInputHandler } from "@/hooks/useTagInputHandler";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import Map from "../util/Map";
import Tag from "../tag/Tag";
import clsx from "clsx";
import styles from "./Form.module.css";
import Show from "../util/Show";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface InputWrapperProps {
  children: ReactNode;
  errorMessage?: string;
  htmlFor?: string;
  className?: string;
  inputName?: string;
}

export default function Form({ children, ...props }: ComponentPropsWithoutRef<"form">) {
  return (
    <form noValidate {...props}>
      {children}
    </form>
  );
}

Form.InputWrapper = ({ inputName, children, htmlFor, errorMessage, className }: InputWrapperProps) => {
  return (
    <div className={clsx(styles.root, className)}>
      <Show when={!!inputName}>
        <span className={styles.inputName}>{inputName}</span>
      </Show>

      <label className={clsx(styles.label, errorMessage && styles.labelError, className)} htmlFor={htmlFor}>
        {children}
      </label>

      <Show when={!!errorMessage}>
        <span className={styles.errorMessage}>{errorMessage}</span>
      </Show>
    </div>
  );
};

type TagInputWrapperProps = {
  input: (props: ComponentPropsWithoutRef<"input">) => ReactNode;
} & UseTagInputHandler;

Form.TagInputWrapper = function TagInputWrapper({ tagList, input, ...props }: TagInputWrapperProps) {
  const { onKeyDown, onKeyUp, onClick } = useTagInputHandler({ tagList, ...props });

  return (
    <div className={styles.tagInputWrapper}>
      <Map each={tagList}>
        {(tag, index) => {
          return (
            <span key={index}>
              <Tag key={index}>{tag}</Tag>

              <button type="button" onClick={() => onClick(index)}>
                <MdClose />
              </button>
            </span>
          );
        }}
      </Map>

      <Show when={tagList.length < 10}>{input({ onKeyUp, onKeyDown })}</Show>
    </div>
  );
};

Form.Input = ({ className, name, ...inputProps }: ComponentPropsWithoutRef<"input">) => {
  return <input {...inputProps} className={clsx(styles.input, className)} name={name} id={name} />;
};

Form.Textarea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<"textarea">>(
  ({ className, name, id, ...inputProps }, ref) => {
    return (
      <textarea {...inputProps} className={clsx(styles.input, className)} name={name} id={id ? id : name} ref={ref} />
    );
  },
);

Form.ImageInput = function ImageInput({ multiple = false, initialValue, setFiles, file }: ImageInputProps) {
  const { preview, handleChange } = useImageInput({ multiple, initialValue, setFiles, file });

  return (
    <label
      htmlFor="image"
      className={styles.inputImage}
      style={{
        backgroundImage: `url(${preview})`,
      }}
    >
      <input id="image" type="file" multiple={multiple} accept=".jpeg, .jpg, .png" onChange={handleChange} />

      <div className={styles.hoverCover}>
        <LuPen />
      </div>
    </label>
  );
};

Form.InputTypeToggler = function InputTypeToggler({ Input }: { Input: (type: "text" | "password") => ReactNode }) {
  // 비밀번호 타입 토글
  const [toggleType, handleToggleType] = useToggle("password", "text");

  return (
    <>
      {Input(toggleType)}

      <button className={styles.button} type="button" onClick={handleToggleType}>
        <Show when={toggleType === "text"} fallback={<IoEyeOutline />}>
          <IoEyeOffOutline />
        </Show>
      </button>
    </>
  );
};

interface EditorProps extends ComponentPropsWithoutRef<"input"> {
  onChange: (e: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
}

Form.MDEditor = function MD({ onChange, name, ...editor }: EditorProps) {
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
      commands={[...command.slice(1, 10), imageCommand, ...command.slice(12, 16)]}
      extraCommands={[...extraCommand.slice(0, 3)]}
      height={600}
    />
  );
};
