import CardReport from "../card/CardReport";
import SearchBinder from "./SearchBinder";
import { Show, Map } from "utilinent";
import { OrderBy, SearchType } from "@/types/graphql.types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useReportQuery } from "@/apis/useDomain/useReport.query";

export default function SearchResult({
  keyword,
  orderBy,
  searchType,
}: {
  keyword: string;
  orderBy: OrderBy;
  searchType: SearchType;
}) {
  const { data, fetchNextPage } = useReportQuery().GetReportListBySearch({
    keyword,
    orderBy,
    searchType,
  });
  const ref = useInfiniteScroll<HTMLParagraphElement>(fetchNextPage);

  return (
    <>
      <SearchBinder>
        <Map each={data.pages}>
          {(page) => <Map each={page?.reportList.items}>{(item) => <CardReport key={item.id} {...item} />}</Map>}
        </Map>
      </SearchBinder>

      <Show when={!!data.pages}>
        <p ref={ref} />
      </Show>
    </>
  );
}
