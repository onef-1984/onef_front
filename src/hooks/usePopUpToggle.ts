import { useEffect, useState } from "react";

export const usePopUpToggle = (id: string) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const { id: targetId } = e.target as HTMLElement;

      if (id !== targetId) {
        setToggle(false);
      }
    });
  }, []);

  return { toggle, handleToggle };
};
