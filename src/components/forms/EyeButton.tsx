import useToggle from "@/hooks/useToggle";
import { ReactNode } from "react";
import { Show } from "../util/Show";
import { IoEyeOffOutline } from "@react-icons/all-files/io5/IoEyeOffOutline";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import styles from "./Input.module.css";

type InputType = "text" | "password";
type EyeButtonProps = {
  Input: (type: InputType) => ReactNode;
};

export default function EyeButton({ Input }: EyeButtonProps) {
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
}
