import { useInfiniteReportSearchListAdaptor } from "@/hooks/useAdaptor/useInfiniteReportSearchListAdaptor";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import CardReport from "../card/CardReport";
import SearchBinder from "./SearchBinder";
import Show from "../util/Show";
import Map from "../util/Map";
import { OrderBy, SearchType } from "@/types/graphql.types";

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

  return (
    <>
      <SearchBinder>
        <Map each={pages}>
          {(page) => <Map each={page?.reportList.items}>{(item) => <CardReport key={item.id} {...item} />}</Map>}
        </Map>
      </SearchBinder>

      <Show when={!!pages}>
        <p ref={ref}></p>
      </Show>
    </>
  );
}
