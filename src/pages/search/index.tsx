import CardReport from "@/components/card/CardReport";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import SearchBar from "@/components/searchPage/SearchBar";
import SearchUser from "@/components/searchPage/SearchUser";
import { useInfiniteReportSearchListAdaptor } from "@/hooks/useAdaptor/useInfiniteReportSearchListAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { SearchType } from "@/types/util.types";

export default function Search() {
  const { pages, fetchNextPage } = useInfiniteReportSearchListAdaptor();
  const { searchType, keyword } = useRouterAdv();

  const search = (searchType: SearchType) => {
    switch (searchType) {
      case "report":
        return <SearchBar />;
      case "user":
        return <SearchUser />;
    }
  };

  return (
    <LayoutWrapper>
      <div style={{ width: "1096px", margin: "0 auto", padding: "1.6rem 2.4rem" }}>
        {search(searchType)}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
          {pages?.map((page) =>
            page.items.map((item) => (
              <CardReport
                key={item.id}
                user={item.user.nickname}
                likeCount={item._count.userLiked}
                id={item.id}
                title={item.title}
                bookTitle={item.book.title}
                cover={item.book.cover}
                content={item.content}
              />
            ))
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
