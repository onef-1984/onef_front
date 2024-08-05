import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import SearchBar from "@/components/searchPage/SearchBar";
import SearchUser from "@/components/searchPage/SearchUser";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { SearchType } from "@/types/util.types";
import styles from "@/styles/Search.module.css";
import SearchBook from "@/components/searchPage/searchBook";
import SearchResult from "@/components/searchPage/SearchResult";
import SearchTitle from "@/components/searchPage/SearchTitle";
import SearchOptionButton from "@/components/clickable/SearchOptionButton";
import SearchTag from "@/components/searchPage/SearchTag";

export default function Search() {
  const { searchType, keyword } = useRouterAdv();

  const searchTitle = (searchType: SearchType) => {
    switch (searchType) {
      case "report":
        return <SearchBar />;

      case "user":
        return <SearchUser />;

      case "book":
        return <SearchBook />;

      case "tag":
        return <SearchTag />;
    }
  };

  return (
    <LayoutWrapper>
      <div className={styles.root}>
        {searchTitle(searchType)}

        {!keyword && <SearchTitle>전체 리뷰</SearchTitle>}

        <SearchOptionButton />

        <SearchResult />
      </div>
    </LayoutWrapper>
  );
}
