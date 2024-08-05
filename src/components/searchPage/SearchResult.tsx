import { useInfiniteReportSearchListAdaptor } from "@/hooks/useAdaptor/useInfiniteReportSearchListAdaptor";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useEffect } from "react";
import SearchBinder from "./SearchBinder";

export default function SearchResult() {
  const { pages, fetchNextPage, hasNext } = useInfiniteReportSearchListAdaptor();
  const { isVisible, setIsVisible, myRef } = useIntersectionObserver();

  useEffect(() => {
    if (isVisible && hasNext !== false) {
      fetchNextPage();
      setIsVisible(false);
    }
  }, [isVisible]);

  const a = pages
    ?.map((page) => {
      return [...page.items];
    })
    .flat();

  return (
    <>
      {a && <SearchBinder items={a} />}
      <p ref={myRef}></p>
    </>
  );
}
