import SearchBar from "@/components/searchPage/SearchBar";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "@/styles/Search.module.css";
import SearchBook from "@/components/searchPage/searchBook";
import SearchResult from "@/components/searchPage/SearchResult";
import SearchTitle from "@/components/searchPage/SearchTitle";
import SearchOptionButton from "@/components/clickable/SearchOptionButton";
import SearchTag from "@/components/searchPage/SearchTag";
import { Match, Show, Switch } from "utilinent";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";

export default function Search() {
  const { keyword, orderBy, searchType } = useRouterAdv();

  return (
    <div className={styles.root}>
      <HeadMetaTag title="리뷰 검색" />

      <Switch when={searchType}>
        <Match key="report">
          <SearchBar />

          <Show when={!keyword}>
            <SearchTitle>전체 리뷰</SearchTitle>
          </Show>
        </Match>

        <Match key="book" element={<SearchBook />} />

        <Match key="tag" element={<SearchTag />} />
      </Switch>

      <SearchOptionButton />

      <SearchResult keyword={keyword} orderBy={orderBy} searchType={searchType} />
    </div>
  );
}
