import { FormEventHandler, useEffect, useRef, useState } from "react";

export const useGetTextAreaHeight = (initValue: string) => {
  const [num, setNum] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initValue) {
      if (textRef.current) {
        textRef.current.style.height = "auto";
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
      }
    }
    setNum((num) => num + 1);
  }, [initValue]);

  const handleInput: FormEventHandler = (e) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  return {textRef, handleInput};
}