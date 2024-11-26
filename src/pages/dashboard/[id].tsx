import SearchOptionButton from "@/components/clickable/SearchOptionButton";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SearchResult from "@/components/searchPage/SearchResult";
import { useUserAdaptor } from "@/hooks/useAdaptor/user/useUserAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { SearchType } from "@/types/graphql.types";
import styles from "@/styles/Dashboard.module.css";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";

export default function Dashboard() {
  const { id: userNickname, orderBy, searchType } = useRouterAdv();
  const { user } = useUserAdaptor(userNickname);

  return (
    <>
      <HeadMetaTag title={userNickname} />

      <div className={styles.root}>
        <DashboardHeader userNickname={userNickname} />
        <br />

        <DashboardNav />

        <SearchOptionButton />

        <SearchResult
          keyword={user.id}
          orderBy={orderBy}
          searchType={searchType === "report" ? ("user" as SearchType) : searchType}
        />
      </div>
    </>
  );
}
