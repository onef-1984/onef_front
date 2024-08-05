import { useInfiniteReportSearchListAdaptor } from "@/hooks/useAdaptor/useInfiniteReportSearchListAdaptor";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import CardReport from "../card/CardReport";
import SearchBinder from "./SearchBinder";

export default function SearchResult() {
  const { pages, fetchNextPage } = useInfiniteReportSearchListAdaptor();
  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return (
    <>
      <SearchBinder>
        {pages?.map((page) => page?.items.map((item) => <CardReport key={item.id} {...item} />))}
      </SearchBinder>

      {pages && <p ref={ref}></p>}
    </>
  );
}
