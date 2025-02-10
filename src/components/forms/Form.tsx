import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import { LuPen } from "react-icons/lu";
import { ImageInputProps, useImageInput } from "@/hooks/useImageInput";
import { IoEyeOffOutline } from "@react-icons/all-files/io5/IoEyeOffOutline";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import { useMDEditorCommands } from "@/hooks/useMDEditorCommands";
import { useTagInputHandler, UseTagInputHandler } from "@/hooks/useTagInputHandler";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import dynamic from "next/dynamic";
import Tag from "../tag/Tag";
import clsx from "clsx";
import styles from "./Form.module.css";
import { Show, Map } from "utilinent";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useGetTextAreaHeight } from "@/hooks/useGetTextAreaHeight";
import { useSicilianContext } from "sicilian/provider";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface InputWrapperProps {
  children: ReactNode;
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

Form.InputWrapper = function InputWrapper({ inputName, children, className }: InputWrapperProps) {
  const { getErrors, name } = useSicilianContext();
  let errorMessage: string;
  try {
    errorMessage = getErrors(name);
  } catch (error) {
    errorMessage = "";
  }

  return (
    <div className={clsx(styles.root, className)}>
      <Show when={!!inputName}>
        <span className={styles.inputName}>{inputName}</span>
      </Show>

      <label className={clsx(styles.label, errorMessage && styles.labelError, className)} htmlFor={name}>
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
} & Omit<UseTagInputHandler, "value">;

Form.TagInputWrapper = function TagInputWrapper({ tagList, input, ...props }: TagInputWrapperProps) {
  const { getValues, name } = useSicilianContext();
  const value = getValues(name) as string;

  const { onKeyDown, onKeyUp, onClick } = useTagInputHandler({ tagList, value, ...props });

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

Form.Input = function Input({ className, ...inputProps }: ComponentPropsWithoutRef<"input">) {
  const { register, name } = useSicilianContext();
  return <input {...register({ name })} {...inputProps} className={clsx(styles.input, className)} />;
};

Form.Textarea = function FormTextarea({
  className,
  initValue,
  ...inputProps
}: ComponentPropsWithoutRef<"textarea"> & { initValue: string }) {
  const { textRef, handleInput } = useGetTextAreaHeight(initValue);
  const { register, name } = useSicilianContext();

  return (
    <textarea
      {...register({ name })}
      {...inputProps}
      className={clsx(styles.input, className)}
      onInput={handleInput}
      ref={textRef}
    />
  );
};

Form.ImageInput = function ImageInput({
  initialValue,
  setFiles,
  file,
  className,
}: ImageInputProps & { className?: string }) {
  const { preview, handleChange } = useImageInput({ initialValue, setFiles, file });

  return (
    <label
      htmlFor="image"
      className={clsx(styles.inputImage, className)}
      style={{
        backgroundImage: `url(${preview})`,
      }}
    >
      <input id="image" type="file" accept=".jpeg, .jpg, .png" onChange={handleChange} />

      <div className={styles.hoverCover}>
        <LuPen />
      </div>
    </label>
  );
};

Form.InputTypeToggler = function InputTypeToggler({ Input }: { Input: (type: "text" | "password") => ReactNode }) {
  // 비밀번호 타입 토글
  const [toggleType, setToggleType] = useState<"text" | "password">("password");

  return (
    <>
      {Input(toggleType)}

      <button
        className={styles.button}
        type="button"
        onClick={() => setToggleType((prev) => (prev === "text" ? "password" : "text"))}
      >
        <Show when={toggleType === "text"} fallback={<IoEyeOutline />}>
          <IoEyeOffOutline />
        </Show>
      </button>
    </>
  );
};

Form.MDEditor = function MD({ ...editor }: Omit<ComponentPropsWithoutRef<"input">, "value">) {
  const { register, name } = useSicilianContext();
  const { value, onChange } = register({ name });

  const { imageCommand, command, extraCommand } = useMDEditorCommands();
  if (command.length === 0 || extraCommand.length === 0) return null;

  return (
    <MDEditor
      className={styles.markdown}
      data-color-mode="light"
      {...editor}
      value={value}
      commands={[...command.slice(1, 10), imageCommand, ...command.slice(12, 16)]}
      extraCommands={[...extraCommand.slice(0, 3)]}
      onChange={(value) => {
        onChange({ target: { name, value: value ?? "" } });
      }}
      height={600}
    />
  );
};
