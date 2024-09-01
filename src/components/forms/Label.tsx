import { IoEyeOffOutline } from "@react-icons/all-files/io5/IoEyeOffOutline";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import { ReactNode } from "react";
import useToggle from "@/hooks/useToggle";
import styles from "./Input.module.css";
import clsx from "clsx";
import { Show } from "../util/Show";

type LabelProps = {
  Input: (type: string) => ReactNode;
  type?: string;
  errorMessage?: string;
  htmlFor: string;
  className?: string;
};

export default function Label({ htmlFor, Input, type = "text", errorMessage, className }: LabelProps) {
  // 비밀번호 타입인지 확인
  const isPassword = (type: string) => {
    return type === "password";
  };

  // 비밀번호 타입 토글
  const [toggleType, handleToggleType] = useToggle(type, isPassword(type) ? "text" : "password");

  return (
    <label className={clsx(styles.label, errorMessage && styles.labelError, className)} htmlFor={htmlFor}>
      {/* 인풋 태그 */}
      {Input(toggleType)}

      {/* 눈깔 찌르기 */}
      <Show when={isPassword(type)}>
        <button className={styles.button} type="button" onClick={handleToggleType}>
          <Show when={isPassword(toggleType)} fallback={<IoEyeOutline />}>
            <IoEyeOffOutline />
          </Show>
        </button>
      </Show>
    </label>
  );
}
