import { useEffect, useRef, useState } from "react";

export const useInfiniteScroll = <T extends HTMLElement>(callback: Function) => {
  // 보여지고 있는지를 나타내는 state
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    // 컴포넌트가 마운트 되면 IntersectionObserver를 생성
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      // 관찰 대상이 화면에 보이면 isVisible을 true로 설정
      setIsVisible(entry.isIntersecting);
    });

    const currentRef = ref.current;

    if (currentRef) {
      // myRef를 관찰 대상으로 설정
      observer.observe(currentRef);
      currentRef.style.minHeight = "1px"; // 기본 높이 설정 (optional)
    }

    // 컴포넌트가 언마운트 되면 observer를 해제
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // 특정 대상을 언옵저브해야 함
      }
      observer.disconnect(); // 옵저버 자체 해제
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      callback();
      setIsVisible(false);
    }
  }, [isVisible, callback, setIsVisible]);

  return ref;
};
