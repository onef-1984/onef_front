import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = () => {
  // 보여지고 있는지를 나타내는 state
  const [isVisible, setIsVisible] = useState(false);
  const myRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // isIntersecting은 교차 되고 있는지를 알려주는 boolean 값
      setIsVisible(entry.isIntersecting);
    });

    if (myRef.current) {
      // 관찰 대상 등록
      observer.observe(myRef.current);
    }

    // 관찰 해제
    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return { isVisible, setIsVisible, myRef };
};

export default useIntersectionObserver;
