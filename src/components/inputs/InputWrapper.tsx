import { useState } from "react";

interface InputWrapperProps {
  children: (type: string) => JSX.Element;
  inputName: string;
  htmlFor: string;
  type?: string;
  typeToggler?: boolean;
}

export default function InputWrapper({
  children,
  inputName,
  htmlFor,
  type = "text",
  typeToggler = false,
}: InputWrapperProps) {
  const [typeState, setType] = useState(type);

  const handleTypeToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div>
      <span>{inputName}</span>
      <label htmlFor={htmlFor}>
        {/* TODO: Input 컴포넌트만 들어와야 함, 타입으로 제한하는 방법을 모색 */}
        {children(typeState)}

        {typeToggler && (
          <button type="button" onClick={handleTypeToggle}>
            보이기
          </button>
        )}
      </label>
    </div>
  );
}
