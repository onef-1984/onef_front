import { useInfiniteReportSearchListAdaptor } from "@/hooks/useAdaptor/useInfiniteReportSearchListAdaptor";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import CardReport from "../card/CardReport";
import SearchBinder from "./SearchBinder";
import { OrderBy, SearchType } from "@/types/util.types";

export default function SearchResult({
  keyword,
  orderBy,
  searchType,
}: {
  keyword: string;
  orderBy: OrderBy;
  searchType: SearchType;
}) {
  const { pages, fetchNextPage } = useInfiniteReportSearchListAdaptor({ keyword, orderBy, searchType });
  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage]);

  console.log(pages);

  return (
    <>
      <SearchBinder>
        {pages?.map((page) => page?.items.map((item) => <CardReport key={item.id} {...item} />))}
      </SearchBinder>

      {pages && <p ref={ref}></p>}
    </>
  );
}
