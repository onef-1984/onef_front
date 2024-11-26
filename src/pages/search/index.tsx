import SearchBar from "@/components/searchPage/SearchBar";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "@/styles/Search.module.css";
import SearchBook from "@/components/searchPage/searchBook";
import SearchResult from "@/components/searchPage/SearchResult";
import SearchTitle from "@/components/searchPage/SearchTitle";
import SearchOptionButton from "@/components/clickable/SearchOptionButton";
import SearchTag from "@/components/searchPage/SearchTag";
import Show from "@/components/util/Show";
import { SearchType } from "@/types/graphql.types";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";

const searchTitle = (searchType: SearchType, keyword: string) => {
  switch (searchType) {
    case "report":
      return (
        <>
          <SearchBar />

          <Show when={!keyword}>
            <SearchTitle>전체 리뷰</SearchTitle>
          </Show>
        </>
      );

    case "book":
      return <SearchBook />;

    case "tag":
      return <SearchTag />;
  }
};

export default function Search() {
  const { keyword, orderBy, searchType } = useRouterAdv();

  return (
    <>
      <HeadMetaTag title="리뷰 검색" />

      <div className={styles.root}>
        {searchTitle(searchType, keyword)}

        <SearchOptionButton />

        <SearchResult keyword={keyword} orderBy={orderBy} searchType={searchType} />
      </div>
    </>
  );
}
