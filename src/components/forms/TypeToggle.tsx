import useToggle from "@/hooks/useToggle";
import { ReactNode } from "react";
import { Show } from "../util/Show";
import { IoEyeOffOutline } from "@react-icons/all-files/io5/IoEyeOffOutline";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import styles from "./Input.module.css";

type InputType = "text" | "password";

type TypeToggleProps = {
  Input: (type: InputType) => ReactNode;
  type: InputType;
};

export default function TypeToggle({ type, Input }: TypeToggleProps) {
  // 비밀번호 타입 토글
  const [toggleType, handleToggleType] = useToggle(type, "text");

  return (
    <>
      {Input(toggleType)}

      <Show when={type === "password"}>
        <button className={styles.button} type="button" onClick={handleToggleType}>
          <Show when={toggleType === "text"} fallback={<IoEyeOutline />}>
            <IoEyeOffOutline />
          </Show>
        </button>
      </Show>
    </>
  );
}
