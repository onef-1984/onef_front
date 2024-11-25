import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = () => {
  // 보여지고 있는지를 나타내는 state
  const [isVisible, setIsVisible] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      setIsVisible(entry.isIntersecting);
    });

    if (myRef.current) {
      observer.observe(myRef.current);
      myRef.current.style.minHeight = "1px";
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return { isVisible, setIsVisible, myRef };
};
