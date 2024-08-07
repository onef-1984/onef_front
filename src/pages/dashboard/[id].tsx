import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import SearchResult from "@/components/searchPage/SearchResult";
import { useUserAdaptor } from "@/hooks/useAdaptor/useUserAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "@/styles/Dashboard.module.css";
import Head from "next/head";

export default function Dashboard() {
  const { id: userNickname, orderBy } = useRouterAdv();
  const { user } = useUserAdaptor(userNickname);

  return (
    <>
      <Head>
        <title>onef - {userNickname}</title>
      </Head>
      <LayoutWrapper>
        <div className={styles.root}>
          <DashboardHeader userNickname={userNickname} />

          <DashboardNav />

          <SearchResult keyword={user.id} orderBy={orderBy} searchType="user" />
        </div>
      </LayoutWrapper>
    </>
  );
}
