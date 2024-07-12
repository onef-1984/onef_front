import { ReactNode } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import styles from "./InputWrapper.module.css";
import clsx from "clsx";
import useToggle from "@/hooks/useToggle";

interface InputWrapperProps {
  input: (type: string) => ReactNode;
  type: string;
  inputName?: string;
  errorMessage?: string;
  htmlFor: string;
}

export default function InputWrapper({ inputName, htmlFor, input, type, errorMessage }: InputWrapperProps) {
  const isPassword = (type: string) => {
    return type === "password";
  };

  const [toggleType, handleToggleType] = useToggle(type, isPassword(type) ? "text" : "password");

  return (
    <div className={styles.root}>
      {inputName && <span className={styles.inputName}>{inputName}</span>}

      <label className={clsx(styles.label, errorMessage && styles.labelError)} htmlFor={htmlFor}>
        {/* 인풋 태그 */}
        {input(toggleType)}

        {/* 눈깔 찌르기 */}
        {isPassword(type) && (
          <button className={styles.button} type="button" onClick={handleToggleType}>
            {isPassword(toggleType) ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
        )}
      </label>

      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
