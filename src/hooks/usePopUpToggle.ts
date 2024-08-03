import { useEffect, useState } from "react";

export const usePopUpToggle = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const { tagName } = e.target as HTMLElement;

      if (tagName !== "IMG") {
        setToggle(false);
      }
    });
  }, []);

  return { toggle, handleToggle };
};
