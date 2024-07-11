import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import styles from "./InputWrapper.module.css";
import clsx from "clsx";

interface InputWrapperProps {
  children: (type: string) => JSX.Element;
  htmlFor: string;
  type: string;
  inputName?: string;
  errorMessage?: string;
}

export default function InputWrapper({ children, inputName, htmlFor, type, errorMessage }: InputWrapperProps) {
  const [typeState, setType] = useState(type);

  const handleTypeToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className={styles.root}>
      {inputName && <span className={styles.inputName}>{inputName}</span>}
      <label className={clsx(styles.label, errorMessage && styles.labelError)} htmlFor={htmlFor}>
        {/* TODO: Input 컴포넌트만 들어와야 함, 타입으로 제한하는 방법을 모색 */}
        {children(typeState)}

        {type === "password" && (
          <button className={styles.button} type="button" onClick={handleTypeToggle}>
            {typeState === "password" ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        )}
      </label>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
}
