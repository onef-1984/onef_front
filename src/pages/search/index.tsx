import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import SearchBar from "@/components/searchPage/SearchBar";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { SearchType } from "@/types/util.types";
import styles from "@/styles/Search.module.css";
import SearchBook from "@/components/searchPage/searchBook";
import SearchResult from "@/components/searchPage/SearchResult";
import SearchTitle from "@/components/searchPage/SearchTitle";
import SearchOptionButton from "@/components/clickable/SearchOptionButton";
import SearchTag from "@/components/searchPage/SearchTag";
import Head from "next/head";

export default function Search() {
  const { keyword, orderBy, searchType } = useRouterAdv();

  const searchTitle = (searchType: SearchType) => {
    switch (searchType) {
      case "report":
        return <SearchBar />;

      case "book":
        return <SearchBook />;

      case "tag":
        return <SearchTag />;
    }
  };

  return (
    <>
      <Head>
        <title>onef - 리뷰 검색</title>
      </Head>

      <LayoutWrapper>
        <div className={styles.root}>
          {searchTitle(searchType)}

          {!keyword && <SearchTitle>전체 리뷰</SearchTitle>}

          <SearchOptionButton />

          <SearchResult keyword={keyword} orderBy={orderBy} searchType={searchType} />
        </div>
      </LayoutWrapper>
    </>
  );
}
