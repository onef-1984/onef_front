import CardReport from "@/components/card/CardReport";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import SearchBar from "@/components/searchPage/SearchBar";
import SearchUser from "@/components/searchPage/SearchUser";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { SearchType } from "@/types/util.types";
import styles from "@/styles/Search.module.css";
import SearchBinder from "@/components/searchPage/SearchBinder";
import SearchBook from "@/components/searchPage/searchBook";
import SearchResult from "@/components/searchPage/SearchResult";

export default function Search() {
  const { searchType } = useRouterAdv();

  const search = (searchType: SearchType) => {
    switch (searchType) {
      case "report":
        return <SearchBar />;
      case "user":
        return <SearchUser />;
      case "book":
        return <SearchBook />;
    }
  };

  return (
    <LayoutWrapper>
      <div className={styles.root}>
        {search(searchType)}

        <SearchResult />
      </div>
    </LayoutWrapper>
  );
}
