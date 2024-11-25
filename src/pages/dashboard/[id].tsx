import SearchOptionButton from "@/components/clickable/SearchOptionButton";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import SearchResult from "@/components/searchPage/SearchResult";
import { useUserAdaptor } from "@/hooks/useAdaptor/user/useUserAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "@/styles/Dashboard.module.css";
import { SearchType } from "@/types/graphql.types";
import Head from "next/head";

export default function Dashboard() {
  const { id: userNickname, orderBy, searchType } = useRouterAdv();
  const { user } = useUserAdaptor(userNickname);

  return (
    <>
      <Head>
        <title>onef - {userNickname}</title>
      </Head>

      <LayoutWrapper>
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
      </LayoutWrapper>
    </>
  );
}
