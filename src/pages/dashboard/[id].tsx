import SearchOptionButton from "@/components/clickable/SearchOptionButton";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SearchResult from "@/components/searchPage/SearchResult";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { SearchType } from "@/types/graphql.types";
import styles from "@/styles/Dashboard.module.css";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import { useUserQuery } from "@/apis/useDomain/useUser.query";

export default function Dashboard() {
  const { id: userNickname, orderBy, searchType } = useRouterAdv();
  const { data = { user: { id: "" } } } = new useUserQuery().getUser(userNickname);

  return (
    <>
      <HeadMetaTag title={userNickname} />

      <div className={styles.root}>
        <DashboardHeader userNickname={userNickname} />
        <br />

        <DashboardNav />

        <SearchOptionButton />

        <SearchResult
          keyword={data.user.id}
          orderBy={orderBy}
          searchType={searchType === "report" ? ("user" as SearchType) : searchType}
        />
      </div>
    </>
  );
}
