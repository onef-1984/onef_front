import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { ReactNode } from "react";
import useToggle from "@/hooks/useToggle";
import styles from "./Input.module.css";
import clsx from "clsx";

type LabelProps = {
  input: (type: string) => ReactNode;
  type?: string;
  errorMessage?: string;
  htmlFor: string;
  className?: string;
};

export default function Label({ htmlFor, input, type = "text", errorMessage, className }: LabelProps) {
  // 비밀번호 타입인지 확인
  const isPassword = (type: string) => {
    return type === "password";
  };

  // 비밀번호 타입 토글
  const [toggleType, handleToggleType] = useToggle(type, isPassword(type) ? "text" : "password");

  return (
    <label className={clsx(styles.label, errorMessage && styles.labelError, className)} htmlFor={htmlFor}>
      {/* 인풋 태그 */}
      {input(toggleType)}

      {/* 눈깔 찌르기 */}
      {isPassword(type) && (
        <button className={styles.button} type="button" onClick={handleToggleType}>
          {isPassword(toggleType) ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      )}
    </label>
  );
}
