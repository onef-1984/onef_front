import { useInfiniteReportSearchListAdaptor } from "@/hooks/useAdaptor/useInfiniteReportSearchListAdaptor";
import CardReport from "../card/CardReport";
import SearchBinder from "./SearchBinder";
import { Show, Map } from "utilinent";
import { OrderBy, SearchType } from "@/types/graphql.types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

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
  const ref = useInfiniteScroll<HTMLParagraphElement>(fetchNextPage);

  return (
    <>
      <SearchBinder>
        <Map each={pages}>
          {(page) => <Map each={page?.reportList.items}>{(item) => <CardReport key={item.id} {...item} />}</Map>}
        </Map>
      </SearchBinder>

      <Show when={!!pages}>
        <p ref={ref} />
      </Show>
    </>
  );
}
